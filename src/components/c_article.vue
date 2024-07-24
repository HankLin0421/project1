<template>
  <div class="container-fluid mt-3">
    <h2 v-if="props.series === 'furniture'" class="me-auto p-2">客廳擺設</h2>
    <h2 v-if="props.series === 'storage'" class="me-auto p-2">收納儲物</h2>
    <h2 v-if="props.series === 'bed'" class="me-auto p-2">寢室內搭</h2>
    <div class="row">
      <div class="col-lg-12">
        <div class="d-flex justify-content-center">
          <a type="button" @click="minus" class="d-flex align-items-center">
            <font-awesome-icon
              :icon="['fas', 'chevron-left']"
              size="3x"
              style="color: gray"
            />
          </a>
          <template v-for="(product, index) in productlist" :key="index">
            <router-link
              :to="{
                name: 'detail',
                params: {
                  categoryId: `${product.p_class}`,
                  detail: `${product.p_id}`,
                },
              }"
              class=""
            >
              <div
                v-if="back <= index && index < next"
                class="card text-center"
                style="width: 15rem"
              >
                <img
                  :src="require(`@/assets/${product.p_image}`)"
                  class="card-img-top"
                  :alt="product.p_image"
                />
                <div class="card-body">
                  <h3 class="card-text" v-text="product.p_name"></h3>
                </div>
              </div>
            </router-link>
          </template>
          <a type="button" @click="plus()" class="d-flex align-items-center">
            <font-awesome-icon
              :icon="['fas', 'chevron-right']"
              size="3x"
              style="color: gray"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps, ref } from "vue";
import axios from "axios";
const url = process.env.VUE_APP_API_URL;
const productlist = ref([]);
const next = ref(6);
const back = ref(0);
const plus = () => {
  if (next.value >= productlist.value.length) return;
  back.value++;
  next.value++;
};
const minus = () => {
  if (back.value <= 0) return;
  back.value--;
  next.value--;
};
const props = defineProps({
  series: {
    type: String,
  },
});
axios
  .get(url, {
    params: {
      do: "article",
      uplink: props.series,
    },
  })
  .then((res) => {
    productlist.value = res.data;
  });
</script>
<style scoped>
a {
  text-decoration: none;
}
.chevron-left {
  line-height: 100%;
}
</style>
