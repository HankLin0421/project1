<template>
  <c_carousel></c_carousel>
  <div class="p-lg-4">
    <h1>打造舒適又完美的家，</h1>
    <h2 class="ms-5 mb-5">尋找自己心目中理想的家具。</h2>
    <div class="d-flex justify-content-md-evenly">
      <div class="showcase d-none d-lg-block">
        <img
          src="https://cdn.pixabay.com/photo/2017/08/08/00/27/home-2609600_1280.jpg"
        />
      </div>
      <div class="showcase">
        <img
          src="https://cdn.pixabay.com/photo/2017/08/02/01/01/living-room-2569325_1280.jpg"
        />
      </div>
      <div class="showcase">
        <img
          src="https://cdn.pixabay.com/photo/2017/03/25/23/32/kitchen-2174593_960_720.jpg"
        />
      </div>
    </div>
  </div>
  <div class="p-lg-4">
    <div class="d-flex justify-content-md-evenly">
      <div class="showcase">
        <img
          src="https://cdn.pixabay.com/photo/2017/06/13/22/42/kitchen-2400367_960_720.jpg"
        />
      </div>
      <div class="border showcase">
        <img
          src="https://cdn.pixabay.com/photo/2021/11/08/00/30/bedroom-6778193_960_720.jpg"
        />
      </div>
    </div>
  </div>
  <div class="text-center mt-5">
    <router-link
      class="d-block"
      :to="{ name: 'main', query: { searchText: '' } }"
    >
      <div>
        <h1>立即前往賣場</h1>
        <div class="linkbox">
          <font-awesome-icon
            :icon="['fas', 'chevron-down']"
            class="fs-2 link"
          />
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import c_carousel from "@/components/c_carousel.vue";
window.scrollTo(0, 0);
</script>

<style scoped lang="scss">
.showcase {
  position: relative;
  width: 25rem;
  height: 25rem;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    transition: transform 1s;
    &:hover {
      transform: scale(1.5);
    }
  }
}
a {
  text-decoration: none;
  font-weight: bold;
  color: #2c3e50;
}
.linkbox {
  overflow: hidden;
  .link {
    animation-name: down;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
}
@keyframes down {
  from {
    transform: translateY(-10%);
  }
  to {
    transform: translateY(15%);
  }
}
</style>
