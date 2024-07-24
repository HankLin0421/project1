import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";
const routes = [
  {
    path: "",
    name: "home",
    alias: "/home",
    component: () => import("@/views/h_home.vue"),
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/h_main.vue"),
  },
  {
    path: "/category/:categoryId",
    name: "categoryId",
    component: () => import("@/views/h_category.vue"),
    // meta: {
    //   breadCrumb: {
    //     text: "Home",
    //     to: "home",
    //   },
    // },
    children: [
      {
        path: ":detail",
        name: "detail",
        component: () => import("@/views/h_detail.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/h_login.vue"),
  },
  {
    path: "/member",
    name: "member",
    component: () => import("@/views/h_member.vue"),
    redirect: { name: "profile" },
    children: [
      {
        path: "profile",
        name: "profile",
        component: () => import("@/views/h_profile.vue"),
      },
      {
        path: "order",
        name: "order",
        component: () => import("@/views/h_order.vue"),
        children: [
          {
            path: "orderDetail",
            name: "orderDetail",
            component: () => import("@/views/h_orderdetail.vue"),
          },
        ],
      },
    ],
    beforeEnter: async () => {
      const isLogin = localStorage.getItem("isLogin");
      if (!isLogin) {
        alert("請先登入");
        return { name: "login" };
      }
      const token = localStorage.getItem("token");
      if (token == "") {
        alert("第三方憑證錯誤，請重新登入");
        return { name: "login" };
      } else {
        const url = process.env.VUE_APP_API_LOGIN;
        const checkToken = await axios
          .get(url, {
            params: {
              token: token,
            },
          })
          .then((res) => {
            return res.data;
          });
        if (!checkToken) {
          localStorage.removeItem("isLogin");
          localStorage.removeItem("token");
          localStorage.removeItem("userName");
          alert("第三方憑證錯誤，請重新登入");
          return { name: "login" };
        }
      }
    },
  },
  {
    path: "/shoppingcart",
    name: "shoppingcart",
    component: () => import("@/views/h_shoppingcart.vue"),
  },
  {
    path: "/checkout",
    name: "checkout",
    component: () => import("@/views/h_checkout.vue"),
    beforeEnter: async () => {
      const isLogin = localStorage.getItem("isLogin");
      if (!isLogin) {
        alert("請先登入");
        return { name: "login" };
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
