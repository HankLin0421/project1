<template>
  <div class="container-fluid">
    <div class="row justify-content-md-center">
      <div class="col-lg-10 col-md-12 col-sm-12 col-12">
        <div class="d-flex justify-content-evenly p-md-5 text-center">
          <div class="photoFrame">
            <router-link
              :to="{
                name: 'categoryId',
                params: {
                  categoryId: 'A',
                },
              }"
            >
              <img
                src="https://cdn.pixabay.com/photo/2016/08/26/15/06/home-1622401_1280.jpg"
                class="w-100 h-100"
              />
              <h6>沙 發</h6>
            </router-link>
          </div>
          <div class="photoFrame">
            <router-link
              :to="{
                name: 'categoryId',
                params: {
                  categoryId: 'B',
                },
              }"
            >
              <img
                src="https://cdn.pixabay.com/photo/2020/08/25/18/29/workplace-5517762_1280.jpg"
                class="w-100 h-100"
              />
              <h6>書 桌</h6>
            </router-link>
          </div>
          <div class="photoFrame">
            <router-link
              :to="{
                name: 'categoryId',
                params: {
                  categoryId: 'I',
                },
              }"
            >
              <img
                src="https://cdn.pixabay.com/photo/2016/04/17/08/09/room-1334323_960_720.jpg"
                class="w-100 h-100"
              />
              <h6>床 架</h6>
            </router-link>
          </div>
          <div class="photoFrame">
            <router-link
              :to="{
                name: 'categoryId',
                params: {
                  categoryId: 'G',
                },
              }"
            >
              <img
                src="https://cdn.pixabay.com/photo/2016/03/01/12/37/be-1230271_960_720.jpg"
                class="w-100 h-100"
              />
              <h6>層 架</h6>
            </router-link>
          </div>
          <div class="photoFrame">
            <router-link
              :to="{
                name: 'categoryId',
                params: {
                  categoryId: 'H',
                },
              }"
            >
              <img
                src="https://cdn.pixabay.com/photo/2018/04/05/16/38/chair-3293322_960_720.jpg"
                class="w-100 h-100"
              />
              <h6>餐 桌</h6>
            </router-link>
          </div>
        </div>
        <div class="p-5">
          <div class="d-flex justify-content-center">
            <input
              type="text"
              class="form-control me-3"
              placeholder="關鍵字搜尋 ex. 顏色、種類"
              v-model="searchText"
            />
            <router-link
              class="btn btn-primary"
              :to="{ name: 'main', query: { searchText: searchText } }"
              @click="resetsearchText()"
              ><font-awesome-icon :icon="['fas', 'magnifying-glass']"
            /></router-link>
          </div>
        </div>
        <product-section></product-section>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import productSection from "@/components/c_productsection.vue";
const searchText = ref("");
const resetsearchText = () => (searchText.value = "");
window.scrollTo(0, 0);
</script>
<style scoped lang="scss">
.photoFrame {
  width: 20%;
  transition: all 1.2s;
  a {
    text-decoration: none;
    font-weight: bold;
    color: #2c3e50;
  }
  &:hover {
    transform: scale(1.2);
  }
}
</style>
