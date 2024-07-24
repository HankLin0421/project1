<template>
  <template v-for="pclass in list" :key="pclass.id">
    <div class="d-flex align-items-center">
      <a class="fs-3" role="button" @click="pclass.active = !pclass.active">
        <font-awesome-icon
          :icon="['fas', 'chevron-right']"
          class="fs-4 chevron-right me-2"
          :class="{ active: pclass.active === true }"
        />{{ pclass.cname }}
      </a>
    </div>
    <div class="ps-3" v-show="pclass.active === true">
      <template v-for="kclass in pclass.childclass" :key="kclass.id">
        <div>
          <router-link
            class="fs-5"
            :to="{
              name: 'categoryId',
              params: {
                categoryId: `${kclass.class}`,
              },
            }"
            >{{ kclass.cname }}</router-link
          >
        </div>
      </template>
    </div>
  </template>
</template>
<script setup>
import { useStore } from "vuex";
const store = useStore();
const list = store.state.ProductClass;
</script>
<style scoped lang="scss">
a {
  text-decoration: none;
  color: #2c3e50;
}
.active {
  transform: rotate(90deg);
}
.chevron-right {
  transition: all 0.3s;
}
</style>
