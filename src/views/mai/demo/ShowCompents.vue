<template>
  <img @click="showModal(img)" v-for="(img, index) in listInfo" :src="img.avatar" :key="index" ref="imgRef" :data-src="img.avatar" alt=""/>
  <div>
    <a-modal v-model:open="open" :closable=false :footer="null" centered  class="custom-modal">
      <template #title>
        <ImgCard :info="info"/>
      </template>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import {ref, toRefs} from 'vue';
import ImgCard from "@/views/mai/demo/ImgCard.vue";
const loading = ref<boolean>(false);
const open = ref<boolean>(false);
const props = defineProps(['listInfo']);
const { listInfo } = toRefs(props);

const info = ref([])
const showModal = (img) => {
  info.value = img;
  open.value = true;
};

const handleOk = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    open.value = false;
  }, 2000);
};

const handleCancel = () => {
  open.value = false;
};
</script>

<style>

.Gallery .imglist img,
.Gallery-add {
  flex: 1 1 0;
  height: 250px; /* change line height here */
  width: auto;
  max-width: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  cursor: pointer;
}

/* other */


.Gallery .imglist img {
  max-width: 100vh;
  transition: 0.5s;
}

.Gallery .imglist img:hover {
  filter: grayscale(1);
}

.Gallery .imglist img.notDisplay {
  max-width: 0;
  margin-left: -6px;
  margin-right: -6px;;
}

/* 使用 scoped 属性确保样式只应用于当前组件 */
.custom-modal .ant-modal-content {
  background-color: transparent !important;
  border-radius: 10px;
}
</style>