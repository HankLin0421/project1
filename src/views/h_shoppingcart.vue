<template>
  <div class="container-fluid">
    <div class="row justify-content-md-center">
      <div
        v-if="emptyCart == true"
        class="mt-5 col-lg-10 col-md-10 col-sm-12 col-12 text-center"
      >
        <h2 class="mt-5">購物車空空如也 ! 趕緊購物去吧 !</h2>
        <div class="turn-down">
          <font-awesome-icon class="w-100 h-100" :icon="['fas', 'turn-down']" />
        </div>
        <div class="cart-plus">
          <font-awesome-icon class="w-100 h-100" :icon="['fas', 'cart-plus']" />
        </div>
      </div>
      <div v-else class="col-lg-10 col-md-10 col-sm-12 col-12">
        <h1>購物車</h1>
        <!-- <a href="#" id="btn01" name="btn01" class="btn btn-primary"
              >繼續購物</a
            >
            <button
              type="button"
              class="btn btn-info"
              onclick="window.history.go(-1);"
            >
              回到上一頁
            </button>
            <button type="button" class="btn btn-success" @click="list">
              清空購物車
            </button>
            <a href="#" class="btn btn-warning">前往結帳</a> -->
        <div class="table-responsive text-center">
          <table class="table table-hover align-middle">
            <thead>
              <tr>
                <th scope="col" width="15%">順序</th>
                <th scope="col" width="5%" class="d-none d-lg-table-cell">
                  圖片
                </th>
                <th scope="col" width="20%">名稱</th>
                <th scope="col" width="15%">價格</th>
                <th scope="col" width="17%">數量</th>
                <th scope="col" width="15%">小計</th>
                <th scope="col" width="18%">下次再買</th>
              </tr>
            </thead>
            <tbody>
              <template
                v-for="(product, index) in cartlist"
                :key="product.p_id"
              >
                <tr>
                  <th scope="row" v-text="index + 1"></th>
                  <td class="d-none d-lg-table-cell">
                    <img
                      class="img-fluid"
                      :src="require(`@/assets/${product.p_image}`)"
                      :alt="product.p_name"
                      :title="product.p_name"
                    />
                  </td>
                  <td v-text="product.p_name"></td>
                  <td v-text="product.p_price"></td>
                  <td>
                    <input
                      class="form-control"
                      type="number"
                      min="1"
                      max="49"
                      required
                      v-model="product.qty"
                      @change="ChangeQty(product.p_id, product.qty)"
                    />
                  </td>
                  <td
                    class="text-danger"
                    v-text="product.qty * product.p_price"
                  ></td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-danger"
                      @click="DelCart(product.p_id)"
                    >
                      刪除
                    </button>
                  </td>
                </tr>
              </template>
            </tbody>
            <tfoot>
              <tr>
                <th
                  colspan="7"
                  class="text-danger"
                  v-text="`總計: ${alltotal}`"
                ></th>
              </tr>
            </tfoot>
          </table>
          <button
            type="button"
            class="btn btn-success fs-5"
            @click="checkOut()"
          >
            結帳
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import axios from "axios";
import { computed, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
const selecturl = process.env.VUE_APP_API_URL;
const emptyCart = ref(false);
const cartlist = ref([]);
const alltotal = computed(() => {
  let total = 0;
  cartlist.value.forEach((item) => {
    total += item.p_price * item.qty;
  });
  return total;
});
// const clearstr = () => localStorage.removeItem("cartlist");
GetCart();
async function GetCart() {
  let CartList = localStorage.getItem("cartlist");
  if (CartList == "[]" || CartList == null) {
    emptyCart.value = true;
  } else {
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
}
function ChangeQty(id, qty) {
  let CartList = localStorage.getItem("cartlist");
  let CartListArray = JSON.parse(CartList);
  for (let item of CartListArray) {
    if (item.p_id == id) {
      item.qty = qty;
    }
  }
  localStorage.setItem("cartlist", JSON.stringify(CartListArray));
}
function DelCart(id) {
  let CartList = localStorage.getItem("cartlist");
  let CartListArray = JSON.parse(CartList);
  CartListArray.forEach((item, index) => {
    if (item.p_id == id) {
      CartListArray.splice(index, 1);
      cartlist.value.splice(index, 1);
    }
  });
  if (cartlist.value.length == 0) {
    emptyCart.value = true;
  }
  store.commit("qtyMinus");

  localStorage.setItem("cartlist", JSON.stringify(CartListArray));
}
function checkOut() {
  const isLogin = localStorage.getItem("isLogin");
  if (!isLogin) {
    alert("請先登入");
    router.push({ name: "login" });
  } else {
    router.push({ name: "checkout" });
  }
}
window.scrollTo(0, 0);
</script>
<style scoped>
.turn-down {
  margin: 5% auto 1%;
  width: 10%;
  height: 10%;
}
.cart-plus {
  margin: 0 auto;
  width: 40%;
  height: 20%;
}
</style>
