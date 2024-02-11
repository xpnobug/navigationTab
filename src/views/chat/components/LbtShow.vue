<template>
  <a-carousel autoplay :dots="false" >
    <div v-for="i in 5" :key="i">
      <img style="width:100%; height: 160px; object-fit: cover;" :src="`https://qexo.reaicc.com/pub/random_image/?num=${i}`" />
    </div>
  </a-carousel>
</template>


<style scoped>
/* For demo */
:deep(.slick-slide) {
  text-align: center;
  height: 70px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}
:deep(.slick-slide h3) {
  color: #fff;
}
</style>
