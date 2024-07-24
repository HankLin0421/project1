import { createStore } from "vuex";
import { ref } from "vue";
export default createStore({
  state: {
    ProductClass: [],
    cartQty: ref(0),
  },
  getters: {},
  mutations: {
    setQty(state, qty) {
      state.cartQty = qty;
    },
    qtyPlus(state) {
      state.cartQty++;
    },
    qtyMinus(state) {
      state.cartQty--;
    },
  },
  actions: {},
  modules: {},
});
