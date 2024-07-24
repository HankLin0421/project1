<template>
  <div class="container-fluid">
    <div class="row justify-content-md-center mt-5">
      <div class="col-lg-6 col-md-12 col-sm-12 col-12 text-center">
        <div class="px-5 py-5">
          <h1>Login in</h1>
          <p class="col my-5">
            <span class="me-2">Account</span>
            <input type="text" v-model="account" />
          </p>
          <p class="col my-5">
            <span class="me-2">Password</span>
            <input type="password" v-model="password" />
          </p>
          <p class="col">
            <button
              class="me-2 btn btn-primary"
              @click="login(account, password)"
            >
              Login
            </button>
            <span>
              Test ? Click
              <a
                class="test"
                onclick="alert('測試帳號: abcde \n測試密碼: 123456');"
                >here</a
              >!</span
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import router from "@/router";
import axios from "axios";
import { ref } from "vue";
const account = ref();
const password = ref();
const url = process.env.VUE_APP_API_LOGIN;
const config = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};
async function login(acc, pass) {
  if (acc === undefined || pass === undefined) {
    alert("帳號或密碼不得為空!");
    return;
  }
  const data = {
    do: "login",
    account: acc,
    password: pass,
  };
  await axios.post(url, data, config).then((res) => {
    if (res.data.checklogin) {
      setLoginlog({
        isLogin: true,
        token: res.data.token,
        userName: res.data.m_name,
        userAcc: res.data.m_account,
      });
      alert(`登入完成，歡迎回來! ${res.data.m_name}`);
      router.push({ name: "home" });
    } else {
      alert("帳號或密碼錯誤!");
      password.value = "";
    }
  });
}
function setLoginlog(obj) {
  if (obj.isLogin) {
    localStorage.setItem("isLogin", obj.isLogin);
    localStorage.setItem("token", obj.token);
    localStorage.setItem("userName", obj.userName);
    localStorage.setItem("userAcc", obj.userAcc);
  }
}
window.scrollTo(0, 0);
</script>
<style scoped>
.test {
  font-size: 1.2rem;
  color: red;
  text-decoration: none;
}
</style>
