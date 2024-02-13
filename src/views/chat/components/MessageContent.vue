<template>
  <!-- 使用 uid 和 content 作为 props -->
  <a-popover :open="visible" trigger="focus" :placement="placement">
    <!-- 定义弹出内容 -->
    <template #content>
      {{ content }}
    </template>
  </a-popover>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useUserStore } from '@/stores/user';

// 创建一个布尔型的响应式引用，用于控制弹出框的显示与隐藏
const visible = ref<boolean>(true);

// 使用 defineProps 定义 props，并指定它们的类型
const props = defineProps(['content', 'uid']);
const { content, uid } = props;

// 导入用户存储的自定义 hook
const userStore = useUserStore();

// 使用计算属性获取用户信息
const userInfo = computed(() => userStore.userInfo);

// 根据 uid 是否与 userInfo 中的 uid 相匹配来决定弹出框的位置
const placement = computed(() => {
  return uid === userInfo.value.uid ? 'leftTop' : 'rightTop';
});
</script>
