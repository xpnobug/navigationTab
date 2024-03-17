<template>
  <a @click="showModal">{{ dateItem.postTitle }}</a>
  <div>
    <a-modal v-model:open="open" width="100%" :title="dateItem.postTitle" @ok="handleOk">
      <!-- <p v-html="dateItem.content"></p> -->
      <div style="display: flex;">
        <MdPreview :editorId="dateItem.postId" :modelValue="dateItem.postContent" />
        <!-- <MdCatalog :editorId="dateItem.postId" :scrollElement="scrollElement" /> -->
      </div>

    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { ref, toRefs } from 'vue';
import { MdPreview, MdCatalog } from 'md-editor-v3';
// preview.css相比style.css少了编辑器那部分样式
import 'md-editor-v3/lib/preview.css';
const open = ref<boolean>(false);
const props = defineProps(['dateItem']);
const { dateItem } = toRefs(props);

const id = 'preview-only';
// const text = ref('# Hello Editor');
const scrollElement = document.documentElement;

const showModal = () => {
  open.value = true;
};

const handleOk = (e: MouseEvent) => {
  // console.log(e);
  open.value = false;
};
</script>
