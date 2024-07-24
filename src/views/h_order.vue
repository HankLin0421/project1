<template>
  <div class="p-3">
    <h3 class="p-2 mb-3 bg-secondary bg-opacity-25 text-dark">購物訂單</h3>
    <div class="table-responsive text-center">
      <table class="table align-middle">
        <thead>
          <tr>
            <th scope="col">訂單編號</th>
            <th scope="col">配送狀態</th>
            <th scope="col">訂單總額</th>
            <th scope="col">運送方式</th>
            <th scope="col">購買日期</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="order in orderSummary" :key="order.o_id">
            <tr>
              <td>
                <router-link
                  :to="{
                    name: 'orderDetail',
                    query: { orderId: order.o_id },
                  }"
                  >{{ order.o_id }}</router-link
                >
              </td>
              <td v-text="order.o_deliveryStatus"></td>
              <td v-text="order.o_total"></td>
              <td v-text="order.o_delivery"></td>
              <td v-text="order.o_create"></td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
const url = process.env.VUE_APP_API_LOGIN;
const orderSummary = ref([]);
const config = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};
const data = {
  do: "orderSummary",
  o_account: localStorage.getItem("userAcc"),
};
axios.post(url, data, config).then((res) => {
  orderSummary.value = res.data;
});
window.scrollTo(0, 0);
</script>
