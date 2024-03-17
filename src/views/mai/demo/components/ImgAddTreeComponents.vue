<template>
  <a-tree-select v-model:value="internalValue" show-search style="width: 100%"
    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }" placeholder="请选择图片类型" allow-clear
    tree-default-expand-all :tree-data="treeData" :field-names="{
      label: 'label',
      value: 'id',
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


const typeItems = ref([
  { id: 1, label: '动漫'},
  { id: 2, label: '古风'},
  { id: 3, label: '情侣'},
  { id: 4, label: '男生'},
  { id: 5, label: '女生'},
  { id: 6, label: '明星'},
  { id: 7, label: '搞怪'},
  { id: 8, label: '精选'},
]);
treeData.value = typeItems.value;

// 监听 modelValue 的变化
watch(internalValue, () => {
  // console.log('update', internalValue.value)
  // 发射 update:modelValue 事件
  emits('update:value', internalValue.value);
});

</script>
  
  