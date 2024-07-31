<template>
  <nav class="section">
    <div class="left">
      <router-link :to="{ name: 'home' }">
        <font-awesome-icon class="box" :icon="['fas', 'store']" />
      </router-link>
      <router-link :to="{ name: 'main', query: { searchText: searchText } }">
        <font-awesome-icon class="box" :icon="['fas', 'house']" />
      </router-link>
      <div class="dropdown">
        <a class="dropdown-toggle" role="button" data-bs-toggle="dropdown">
          <font-awesome-icon class="box" :icon="['fas', 'rectangle-list']" />
        </a>
        <ul class="dropdown-menu">
          <template v-for="pclass in list" :key="pclass.id">
            <li v-for="kclass in pclass.childclass" :key="kclass.id">
              <router-link
                class="dropdown-item"
                :to="{
                  name: 'categoryId',
                  params: {
                    categoryId: `${kclass.class}`,
                  },
                }"
                >{{ kclass.cname }}
              </router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
    <div class="right">
      <router-link :to="{ name: 'member' }">
        <font-awesome-icon class="box" :icon="['fas', 'user']" />
      </router-link>
      <router-link :to="{ name: 'shoppingcart' }" class="cart">
        <font-awesome-icon class="box" :icon="['fas', 'cart-shopping']" />
        <b ref="qty" class="text-bg-primary badge cartQty" v-text="cartQty"></b>
      </router-link>
    </div>
  </nav>
</template>
<script setup>
import { ref, computed, watch, onMounted } from "vue";
import axios from "axios";
import { useStore } from "vuex";
const store = useStore();
const url = process.env.VUE_APP_API_URL;
const qty = ref(null);
const list = ref([]);
const searchText = ref("");
const cartQty = computed(() => store.state.cartQty);
watch(cartQty, () => {
  qty.value.classList.add("qty");
});
onMounted(() => {
  setCartQty();
  qty.value.addEventListener("transitionend", () => {
    qty.value.classList.remove("qty");
  });
});
const setCartQty = () => {
  let CartList = localStorage.getItem("cartlist");
  let qty = 0;
  if (!(CartList == "[]" || CartList == null)) {
    let CartListArray = JSON.parse(CartList);
    CartListArray.forEach(() => qty++);
  }
  store.commit("setQty", qty);
};
axios
  .get(url, {
    params: {
      do: "class",
    },
  })
  .then((res) => {
    list.value = res.data;
    store.state.ProductClass = res.data;
  });
</script>
<style scoped lang="scss">
.section {
  position: sticky;
  top: 0;
  display: flex;
  height: 60px;
  text-align: center;
  justify-content: space-between;
  background: linear-gradient(180deg, white, rgb(190, 190, 190));
  z-index: 99;
  line-height: 60px;
  .left {
    display: flex;
  }
  .right {
    display: flex;
    .cart {
      position: relative;
      .qty {
        transform: scale(1.5);
      }
      .cartQty {
        position: absolute;
        bottom: 10%;
        right: 15%;
        font-size: 10px;
        transition: all 0.5s;
      }
    }
  }
  .box {
    width: 65px;
    font-size: 30px;
  }
  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
  }
  .dropdown-menu {
    font-size: 20px;
    line-height: 30px;
  }
}
</style>
