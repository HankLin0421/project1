<template>
  <div class="container-fluid">
    <div class="row justify-content-md-center">
      <div class="col-lg-10 col-md-12 col-sm-12 col-12">
        <div class="row">
          <div class="col-lg-3 col-md-3 d-none d-md-block">
            <left-aside></left-aside>
          </div>
          <div class="col-lg-9 col-md-9 col-sm-12 col-12">
            <product-section></product-section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import leftAside from "@/components/c_aside.vue";
import productSection from "@/components/c_productsection.vue";
window.scrollTo(0, 0);
</script>
