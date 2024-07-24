<template>
  <div class="p-4">
    <h3 class="p-2 mb-3 bg-secondary bg-opacity-25 text-dark">設定帳戶</h3>
    <div class="p-5">
      <h5 class="mb-5" v-text="`會員帳號 : ${memberProfile.m_account}`"></h5>
      <h5>會員密碼 : *****</h5>
    </div>
  </div>
  <div class="p-4">
    <h3 class="p-2 mb-3 bg-secondary bg-opacity-25 text-dark">個人資料</h3>
    <div class="p-5">
      <h5 class="mb-5">
        <span class="me-2">姓名 :</span>
        <input type="text" v-model="memberProfile.m_name" />
      </h5>
      <h5>
        <span class="me-2">生日 :</span>
        <input type="date" v-model="memberProfile.m_birthday" />
      </h5>
    </div>
  </div>
  <div class="p-4">
    <h3 class="p-2 mb-3 bg-secondary bg-opacity-25 text-dark">通訊資料</h3>
    <div class="p-4">
      <h5 class="mb-5">
        <span class="me-2">市話 :</span>
        <input type="text" v-model="memberProfile.m_tel" />
      </h5>
      <h5 class="mb-5">
        <span class="me-2">手機 :</span>
        <input type="text" v-model="memberProfile.m_phone" />
      </h5>
      <h5 class="mb-5">
        <span class="me-2">Email :</span>
        <input type="text" v-model="memberProfile.m_email" size="30" />
      </h5>
      <h5>
        <span class="me-2">地址 :</span>
        <input type="text" v-model="memberProfile.m_address" size="30" />
      </h5>
    </div>
  </div>
  <div class="p-5 text-center">
    <button type="button" class="btn btn-info fs-5" @click="saveProfile">
      儲存更改
    </button>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
const url = process.env.VUE_APP_API_LOGIN;
const memberProfile = ref({});
const config = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};
let data = {
  do: "getProfile",
  m_account: localStorage.getItem("userAcc"),
};
axios.post(url, data, config).then((res) => {
  memberProfile.value = res.data;
});
const saveProfile = () => {
  let data = {
    do: "updateProfile",
  };
  Object.keys(memberProfile.value)
    .filter((key) => !key.includes("m_password"))
    .map((key) => {
      data[key] = memberProfile.value[key];
    });
  axios.post(url, data, config).then((res) => {
    if (res.data) {
      alert("更新成功");
      window.scrollTo(0, 0);
    }
  });
};
window.scrollTo(0, 0);
</script>
<style scoped>
input:focus {
  outline-color: rgb(0, 162, 255);
}
</style>
