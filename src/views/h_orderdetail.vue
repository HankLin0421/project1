<template>
  <h3
    class="p-2 bg-secondary bg-opacity-25 text-dark"
    v-text="`編號 ${orderId} 的訂單資訊`"
  ></h3>
  <div class="p-5">
    <div class="p-2">
      <h5 v-text="`訂購人: ${orderDetail.o_name}`"></h5>
    </div>
    <div class="p-2">
      <h5 v-text="`聯絡電話: ${orderDetail.o_phone}`"></h5>
    </div>
    <div class="p-2">
      <h5 v-text="`配送方式: ${orderDetail.o_delivery}`"></h5>
    </div>
    <div class="p-2">
      <h5 v-text="`配送地址: ${orderDetail.o_address}`"></h5>
    </div>
    <div class="p-2">
      <h5 v-text="`訂單總額: ${orderDetail.o_total} 元`"></h5>
    </div>
    <div class="p-2">
      <h5 v-text="`訂購時間: ${orderDetail.o_create}`"></h5>
    </div>
    <div class="p-2">
      <h5 v-text="`備註: ${orderDetail.o_note}`"></h5>
    </div>
  </div>
  <h3 class="p-2 bg-secondary bg-opacity-25 text-dark">訂單狀態</h3>
  <div class="text-center p-5">
    <template v-if="orderDetail.o_deliveryStatus == '準備中'">
      <font-awesome-icon class="deliveryStatus" :icon="['fas', 'box']" />
    </template>
    <template v-else-if="orderDetail.o_deliveryStatus == '配送中'">
      <font-awesome-icon class="deliveryStatus" :icon="['fas', 'truck']" />
    </template>
    <template v-else-if="orderDetail.o_deliveryStatus == '已結單'">
      <font-awesome-icon
        class="deliveryStatus"
        :icon="['fas', 'file-circle-check']"
      />
    </template>
    <h5 class="mt-3" v-text="orderDetail.o_deliveryStatus"></h5>
  </div>
  <h3 class="p-2 bg-secondary bg-opacity-25 text-dark">訂單商品</h3>
  <div class="table-responsive text-center">
    <table class="table align-middle">
      <thead>
        <tr>
          <th scope="col">名稱</th>
          <th scope="col">價格</th>
          <th scope="col">數量</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="item in orderDetail.o_item" :key="item.p_id">
          <tr>
            <td v-text="item.p_name"></td>
            <td v-text="item.p_price"></td>
            <td v-text="item.qty"></td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";
import axios from "axios";
import { computed, ref, watch } from "vue";
const route = useRoute();
const orderId = computed(() => route.query.orderId);
const orderDetail = ref({});
const loginurl = process.env.VUE_APP_API_LOGIN;
const selecturl = process.env.VUE_APP_API_URL;
const config = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};
let data = {
  do: "orderDetail",
  o_id: orderId.value,
  o_account: localStorage.getItem("userAcc"),
};
watch(orderId, (val) => {
  data.o_id = val;
  axios.post(loginurl, data, config).then((res) => {
    orderDetail.value = res.data;
    getItemDetail(JSON.parse(orderDetail.value.o_item));
  });
  window.scrollTo(0, 0);
});
axios.post(loginurl, data, config).then((res) => {
  orderDetail.value = res.data;
  getItemDetail(JSON.parse(orderDetail.value.o_item));
});
async function getItemDetail(itemArray) {
  orderDetail.value.o_item = [];
  for (let item of itemArray) {
    await axios
      .get(selecturl, {
        params: {
          do: "cart",
          p_id: item.p_id,
          qty: item.qty,
        },
      })
      .then((res) => {
        orderDetail.value.o_item.push(res.data);
      });
  }
}
window.scrollTo(0, 0);
</script>
<style scoped>
.deliveryStatus {
  width: 10%;
  height: 10%;
}
</style>
