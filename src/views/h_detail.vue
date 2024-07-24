<template>
  <div class="row">
    <h1>商品介紹</h1>
    <div class="card mb-3">
      <div class="row">
        <div class="col-lg-4 col-md-6 col-sm-6 col-12 border-end">
          <img
            :src="src"
            class="img-fluid rounded"
            :alt="`${product.p_name}`"
            :title="`${product.p_name}`"
          />
          <div class="row">
            <template v-for="item in product.all_image" :key="item.sort_id">
              <div class="col-md-4 col-sm-6 col-4 border">
                <img
                  :src="require(`@/assets/${item.img_name}`)"
                  :alt="`${product.p_name}`"
                  :title="`${product.p_name}`"
                  class="img-fluid"
                  @click="bigimg(item.img_name)"
                />
              </div>
            </template>
          </div>
        </div>
        <div class="col-lg-8 col-md-6 col-sm-6 col-12 py-5">
          <div class="row">
            <h2 class="card-title">{{ product.p_name }}</h2>
            <p class="card-text mt-2">{{ product.p_intro }}</p>
            <h4 class="card-text mt-3">NT. {{ product.p_price }}</h4>
          </div>
          <div class="row mt-3">
            <div class="col-lg col-md-7 col-sm-7 col">
              <div class="input-group input-group-lg">
                <span class="input-group-text" id="inputGroup-sizing-lg"
                  >數量</span
                >
                <input
                  id="qty"
                  type="number"
                  min="1"
                  max="50"
                  value="1"
                  class="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-lg"
                />
              </div>
            </div>
            <div class="col-lg col-md-5 col-sm-5 col">
              <button
                type="button"
                class="btn btn-success btn-lg color-success"
                @click="addCart(product.p_id)"
              >
                加入購物車
              </button>
            </div>
          </div>
          <p class="card-text mt-5">{{ product.p_content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";
import { ref, watch, computed } from "vue";
import { useStore } from "vuex";
import axios from "axios";
const product = ref([]);
const store = useStore();
const route = useRoute();
const url = process.env.VUE_APP_API_URL;
const p_id = computed(() => route.params.detail);
const src = ref();
const bigimg = (img) => {
  src.value = require(`@/assets/${img}`);
};
function productfn(paramsid) {
  axios
    .get(url, {
      params: {
        do: "product",
        p_id: paramsid,
      },
    })
    .then((res) => {
      product.value = res.data;
      src.value = require(`@/assets/${res.data.p_image}`);
    });
}
productfn(p_id.value);
watch(p_id, (val) => {
  productfn(val);
});

function addCart(id) {
  let qty = document.getElementById("qty").value;
  if (qty <= 0) {
    alert("產品數量不可為0或負數!");
    return false;
  }
  if (qty == undefined) {
    qty = 1;
  }
  let p_id = id;
  let Has_Cart = 0;
  const data = {
    p_id: p_id,
    qty: Number(qty),
  };
  let CartList = localStorage.getItem("cartlist");
  if (CartList == null) {
    localStorage.setItem("cartlist", JSON.stringify([data]));
    //以陣列方式存取物件
  } else {
    // localStorage.removeItem("cartlist");
    let CartListArray = JSON.parse(CartList);
    CartListArray.forEach((item) => {
      if (data.p_id == item.p_id) {
        let qty = Number(item.qty) + Number(data.qty);
        // item.qty = qty.toString();
        item.qty = qty;
        Has_Cart++;
      }
    });
    if (Has_Cart == 0) {
      store.commit("qtyPlus");
      CartListArray.push(data);
    }
    localStorage.setItem("cartlist", JSON.stringify(CartListArray));
  }
}
window.scrollTo(0, 0);
</script>
