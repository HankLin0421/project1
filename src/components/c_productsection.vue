<template>
  <router-view></router-view>
  <template v-if="categoryId != undefined">
    <h1 class="d-inline-block" v-text="p_class"></h1>
    <h3 class="d-inline-block">系列商品</h3>
  </template>
  <template
    v-if="
      searchText != '' && productlist.length != 0 && categoryId == undefined
    "
  >
    <h2 class="d-inline-block">關鍵字:</h2>
    <h2 class="d-inline-block" v-text="searchText"></h2>
  </template>
  <div class="p-sm-2">
    <div class="row text-center">
      <template v-if="productlist.length == 0 && searchText != ''">
        <div class="magnifying-glass">
          <font-awesome-icon
            class="w-100 h-100"
            :icon="['fas', 'magnifying-glass']"
          />
        </div>
        <h3 class="mt-5" v-text="`搜尋不到 &quot; ${searchText} &quot; `"></h3>
      </template>
      <template v-for="(product, index) in productlist" :key="product.p_id">
        <div
          v-if="back <= index && index < next"
          class="card col-12 col-md-3 col-sm-6 col-lg-3"
        >
          <img
            :src="require(`@/assets/${product.p_image}`)"
            class="card-img-top"
            :alt="`${product.p_name}`"
          />
          <div class="card-body">
            <h5 class="card-title" v-text="product.p_name"></h5>
            <p class="card-text" v-text="product.p_intro"></p>
            <p class="card-text" v-text="`NT. ${product.p_price}`"></p>
            <div class="row">
              <div class="col-6 col-sm-6 col-md-12 col-lg-12">
                <router-link
                  :to="{
                    name: 'detail',
                    params: {
                      categoryId: `${product.class}`,
                      detail: `${product.p_id}`,
                    },
                  }"
                  class="btn btn-primary"
                >
                  更多資訊
                </router-link>
              </div>
              <div class="col-6 col-sm-6 col-md-12 col-lg-12 g-md-2">
                <button class="btn btn-success" @click="addCart(product.p_id)">
                  放入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <template v-if="productlist.length != 0">
      <div class="row text-center p-5">
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li
              class="page-item"
              :class="{ disabled: back === 0 }"
              @click="minus"
            >
              <a role="button" class="page-link">Previous</a>
            </li>
            <li class="page-item">
              <span class="page-link" v-text="page"></span>
            </li>
            <li class="page-item">
              <a
                role="button"
                class="page-link"
                @click="plus"
                :class="{
                  disabled: productlist.length - next <= 0,
                }"
                >Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </template>
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";
import { ref, watch, computed } from "vue";
import { useStore } from "vuex";
import axios from "axios";
const route = useRoute();
const productlist = ref([]);
const url = process.env.VUE_APP_API_URL;
const categoryId = computed(() => route.params.categoryId);
const searchText = computed(() => route.query.searchText);
const store = useStore();
const list = store.state.ProductClass;
const p_class = ref();
const next = ref(8);
const back = ref(0);
const page = computed(() => next.value / 8);
const plus = () => {
  if (next.value >= productlist.value.length) return;
  back.value += 8;
  next.value += 8;
  window.scrollTo(0, 0);
};
const minus = () => {
  if (back.value <= 0) return;
  back.value -= 8;
  next.value -= 8;
  window.scrollTo(0, 0);
};
for (let x of list) {
  for (let item of x.childclass) {
    if (item.class == categoryId.value) {
      p_class.value = item.cname;
    }
  }
}
function productlistfn(paramsclass) {
  axios
    .get(url, {
      params: {
        do: "productlist",
        class: paramsclass,
      },
    })
    .then((res) => {
      productlist.value = res.data;
    });
}
function searchfn(paramssearch) {
  axios
    .get(url, {
      params: {
        do: "search",
        searchText: paramssearch,
      },
    })
    .then((res) => {
      productlist.value = res.data;
    });
}
if (searchText.value != undefined) {
  watch(searchText, (val) => {
    searchfn(val);
    back.value = 0;
    next.value = 8;
  });
  searchfn(searchText.value);
}
if (categoryId.value != undefined) {
  watch(categoryId, (val) => {
    productlistfn(val);
    for (let x of list) {
      for (let item of x.childclass) {
        if (item.class == val) {
          p_class.value = item.cname;
        }
      }
    }
    window.scrollTo(0, 0);
    back.value = 0;
    next.value = 8;
  });
  productlistfn(categoryId.value);
}

function addCart(id) {
  let p_id = id;
  let Has_Cart = 0;
  const data = {
    p_id: p_id,
    qty: 1,
  };
  let CartList = localStorage.getItem("cartlist");
  if (CartList == null) {
    localStorage.setItem("cartlist", JSON.stringify([data]));
  } else {
    let CartListArray = JSON.parse(CartList);
    CartListArray.forEach((item) => {
      if (data.p_id == item.p_id) {
        let qty = Number(item.qty) + Number(data.qty);
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
</script>
<style scoped>
.magnifying-glass {
  margin: 0 auto;
  width: 15%;
  height: 10%;
}
</style>
