<template>
  <div class="container-fluid">
    <div class="row justify-content-md-center">
      <div class="col-lg-9 col-md-11 col-sm-12 col-12">
        <div class="row">
          <div class="col-lg-2 col-md-2 col-sm-12 col-12">
            <div class="row text-center">
              <div class="m_aside col-4 col-sm-4 col-md-12 col-lg-12 px-0">
                <router-link
                  class="m_aside_a d-block fs-3 text-decoration-none"
                  :to="{ name: 'profile' }"
                  >會員資料
                </router-link>
              </div>
              <div class="m_aside col-4 col-sm-4 col-md-12 col-lg-12 px-0">
                <router-link
                  class="m_aside_a d-block fs-3 text-decoration-none"
                  :to="{ name: 'order' }"
                  >購物訂單</router-link
                >
              </div>
              <div class="m_aside col-4 col-sm-4 col-md-12 col-lg-12 px-0">
                <a
                  class="m_aside_a d-block fs-3 text-decoration-none"
                  role="button"
                  @click="logout()"
                  >登出</a
                >
              </div>
            </div>
          </div>
          <div class="col-lg-9 col-md-9 col-sm-12 border">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
window.scrollTo(0, 0);
const logout = () => {
  if (confirm("確定要登出?")) {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userAcc");
    router.push({ name: "home" });
  }
};
</script>
<style scoped lang="scss">
.m_aside {
  height: 100px;
  line-height: 100px;
  .m_aside_a {
    box-shadow: inset 0 0 5px 1px rgba(160, 160, 160, 0.7);
    color: black;
    &:hover {
      color: white;
      background-color: rgba(80, 80, 80, 0.4);
    }
  }
}
</style>
