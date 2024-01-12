<template>
  <a-tree-select v-model:value="internalValue" show-search style="width: 100%"
    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }" placeholder="请选择文章类型" allow-clear
    tree-default-expand-all :tree-data="treeData" :field-names="{
      children: 'children',
      label: 'title',
      value: 'key',
    }" tree-node-filter-prop="type"></a-tree-select>
</template>

<script lang="ts" setup>
import { getBlogFlList } from '@/api/blog';
import { ref, watch, onMounted, defineProps, defineEmits } from 'vue';
import type { TreeSelectProps } from 'ant-design-vue';

const treeData = ref<TreeSelectProps['treeData']>([]);
const value = ref<string>(''); // 提供一个默认值
const internalValue = ref<string>('');
const emits = defineEmits(['update:value']);

onMounted(() => {
  getBlogFlList()
    .then(res => {
      //   initLoading.value = false;
      treeData.value = res.data;
      console.log(treeData.value);
    });
});

// 监听 modelValue 的变化
watch(internalValue, () => {
  console.log('update', internalValue.value)
  // 发射 update:modelValue 事件
  emits('update:value', internalValue.value);
});

</script>
  
  