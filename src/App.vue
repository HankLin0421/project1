<template>
  <nav-bar></nav-bar>
  <router-view />
  <c_footer></c_footer>
</template>

<script setup>
import navBar from "@/components/c_navbar.vue";
import c_footer from "@/components/c_footer.vue";
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+HK:wght@100..900&display=swap");
#app {
  font-family: "Noto Sans HK", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
</style>
