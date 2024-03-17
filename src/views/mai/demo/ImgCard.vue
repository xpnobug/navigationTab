<template>
  <div class="main">
    <div class="background" :style="{ background: 'url(' + info.card + ')', backgroundPosition:'center',backgroundSize:'cover' }"></div> <!-- 背景图片 -->
    <div class="center">
      <img :src="info.avatar" alt="">
      <div class="content">
        <p>{{ info.name }}</p>
        <span>{{ info.memo }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {toRefs} from "vue";

const props = defineProps(['info']);
const { info } = toRefs(props);
</script>

<style scoped>
.main {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /*background-image: url("http://8.140.45.252:9000/mai/card/2024-03/000000/423a3968-9c57-4609-b374-8480fb896542.jpg");*/
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: brightness(80%); /* 减少亮度 */

}
.center{
  margin: 20px;
  text-align: center;
  filter: brightness(100%); /* 减少亮度 */
}
.center img{
  width: 100px;
  height: 100px;
  border-radius: 50px;
  z-index: 1; /* 将内容置于上层 */
}
.content{
  font-size: 16px;
  color: white;
  text-align: center;
}
</style>