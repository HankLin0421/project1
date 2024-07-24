<template>
  <div
    id="carouselExampleControls"
    class="carousel slide"
    data-bs-ride="carousel"
  >
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img
          src="https://cdn.pixabay.com/photo/2017/09/09/18/25/living-room-2732939_1280.jpg"
          class="d-block w-100 carousel-img"
          alt="..."
        />
      </div>
      <div class="carousel-item">
        <img
          src="https://cdn.pixabay.com/photo/2017/03/19/01/43/living-room-2155376_1280.jpg"
          class="d-block w-100 carousel-img"
          alt="..."
        />
      </div>
      <div class="carousel-item">
        <img
          src="https://cdn.pixabay.com/photo/2016/12/30/07/59/kitchen-1940174_1280.jpg"
          class="d-block w-100 carousel-img"
          alt="..."
        />
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleControls"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleControls"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
    </button>
  </div>
</template>

<style scoped>
.carousel-img {
  height: 75vh;
}
</style>
