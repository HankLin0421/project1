<template>
  <div class="container-fluid">
    <div class="row justify-content-md-center">
      <div class="col-lg-8 col-md-10 col-sm-12 col-12 border">
        <h3 class="p-2 mb-3 bg-secondary bg-opacity-50 text-dark">基本資料</h3>
        <div class="p-4">
          <h5 class="mb-5">
            <label for="name" class="me-2">訂購人姓名 :</label>
            <input id="name" type="text" v-model="orderInfo.m_name" />
          </h5>
          <h5 class="mb-5">
            <label for="phone" class="me-2">連絡電話 :</label>
            <input id="phone" type="text" v-model="orderInfo.m_phone" />
          </h5>
          <h5 class="mb-5">
            <label for="note" class="me-2">備註 :</label>
            <input id="note" type="text" v-model="note" />
          </h5>
        </div>
        <h3 class="p-2 mb-3 bg-secondary bg-opacity-50 text-dark">商品確認</h3>
        <div class="table-responsive text-center py-3">
          <table class="table table-hover align-middle">
            <thead>
              <tr>
                <th scope="col" width="20%">順序</th>
                <th scope="col" width="20%">名稱</th>
                <th scope="col" width="20%">價格</th>
                <th scope="col" width="20%">數量</th>
                <th scope="col" width="20%">小計</th>
              </tr>
            </thead>
            <tbody>
              <template
                v-for="(product, index) in cartlist"
                :key="product.p_id"
              >
                <tr>
                  <th scope="row" v-text="index + 1"></th>
                  <td v-text="product.p_name"></td>
                  <td v-text="product.p_price"></td>
                  <td v-text="product.qty"></td>
                  <td v-text="product.p_price * product.qty"></td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <h3 class="p-2 mb-3 bg-secondary bg-opacity-50 text-dark">運送方式</h3>
        <div class="p-4">
          <h5>
            <input type="radio" id="store" v-model="deliveryMethod" value="0" />
            <label for="store">店內自取</label>
          </h5>
        </div>
        <div class="p-4">
          <h5 class="mb-5">
            <input
              type="radio"
              id="express"
              value="120"
              v-model="deliveryMethod"
            />
            <label for="express">國內運送</label>
          </h5>
          <h5 v-if="deliveryMethod === '120'" class="mb-5 ms-1">
            <label for="address" class="me-2">配送地址 :</label>
            <input
              id="address"
              type="text"
              size="30"
              v-model="orderInfo.m_address"
            />
          </h5>
        </div>
        <h3 class="p-2 mb-3 bg-secondary bg-opacity-50 text-dark">金額總額</h3>
        <div class="p-4 text-center">
          <h4 class="mb-5" v-text="`運費 :${deliveryMethod}`"></h4>
          <h4 class="mb-5" v-text="`總額 :${alltotal}`"></h4>
          <button type="button" class="btn btn-success fs-5" @click="order">
            下單
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import axios from "axios";
import { ref, computed } from "vue";
const selecturl = process.env.VUE_APP_API_URL;
const memberurl = process.env.VUE_APP_API_LOGIN;
const note = ref("");
const orderInfo = ref({});
const cartlist = ref([]);
const deliveryMethod = ref("120");
const alltotal = computed(() => {
  let total = 0;
  cartlist.value.forEach((item) => {
    total += item.p_price * item.qty;
  });
  total += Number(deliveryMethod.value);
  return total;
});
function getMember() {
  let config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  let data = {
    do: "orderInfo",
    m_account: localStorage.getItem("userAcc"),
  };
  axios.post(memberurl, data, config).then((res) => {
    orderInfo.value = res.data;
  });
}
async function getCart() {
  let CartList = localStorage.getItem("cartlist");
  let CartListArray = JSON.parse(CartList);
  for (let item of CartListArray) {
    await axios
      .get(selecturl, {
        params: {
          do: "cart",
          p_id: item.p_id,
          qty: item.qty,
        },
      })
      .then((res) => {
        cartlist.value.push(res.data);
      });
  }
}
const order = () => {
  let config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  };
  let memberInfo = {
    o_account: orderInfo.value.m_account,
    o_name: orderInfo.value.m_name,
    o_address: orderInfo.value.m_address,
    o_phone: orderInfo.value.m_phone,
    o_note: note.value,
    o_total: alltotal.value,
    o_delivery: "",
    o_deliveryStatus: "準備中",
  };
  if (deliveryMethod.value == "120") {
    memberInfo.o_delivery = "國內運送";
  } else {
    memberInfo.o_delivery = "店內自取";
    memberInfo.o_address = "";
  }
  console.log(memberInfo);
  const data = {
    do: "checkout",
    orderInfo: memberInfo,
    cartInfo: localStorage.getItem("cartlist"),
  };
  axios.post(memberurl, data, config).then((res) => {
    console.log(res.data);
    if (res.data) {
      localStorage.setItem("cartlist", "[]");
      router.push({ name: "order" });
    } else {
      alert("下單失敗");
      router.push({ name: "cartlist" });
    }
  });
};
getMember();
getCart();
window.scrollTo(0, 0);
</script>
<style scoped>
input:focus {
  outline-color: rgb(0, 162, 255);
}
</style>
