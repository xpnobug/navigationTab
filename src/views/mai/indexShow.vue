<template>
  <a-tabs v-model:activeKey="activeKey" centered>
    <a-tab-pane :key="item.key" :tab="item.title" v-for="item in tabsData">
      <demo2 />
    </a-tab-pane>
  </a-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Demo2 from "@/views/mai/demo/demo2.vue";

const activeKey = ref('1');

// 自定义设置数据
const tabsData = ref([
  { key: '1', title: '动漫' },
  { key: '2', title: '电影' },
  { key: '3', title: '音乐' },
  // 添加更多的标签页信息
]);
</script>

<style scoped>
/* 这里可以添加样式 */
</style>
