<script setup lang="ts">
import GiOption from '@/components/gi-option/index.vue';
import GiOptionItem from '@/components/gi-option-item/index.vue';
import SvgIcon from "@/components/svg-icon/index.vue";

interface Props {
  showClassStyle?: boolean;
}

withDefaults(defineProps<Props>(), {
  showClassStyle: true,
});

const emit = defineEmits(['click']);

const onClickItem = (mode: string) => {
  emit('click', mode);
};
</script>

<template>
  <GiOption :class="{ option: showClassStyle }">
    <GiOptionItem @click="onClickItem('rename')">
      <template #icon>
        <svg-icon icon-class="menu-edit"/>
      </template>
      <span>重命名</span>
    </GiOptionItem>
    <GiOptionItem @click="onClickItem('download')">
      <template #icon>
        <svg-icon icon-class="menu-download"/>
      </template>
      <span>下载</span>
    </GiOptionItem>
    <GiOptionItem @click="onClickItem('detail')">
      <template #icon>
        <svg-icon icon-class="menu-detail"/>
      </template>
      <span>详情</span>
    </GiOptionItem>
    <GiOptionItem @click="onClickItem('delete')">
      <template #icon>
        <svg-icon icon-class="menu-delete"/>
      </template>
      <span>删除</span>
    </GiOptionItem>
  </GiOption>
</template>

<style lang="less" scoped>
.option {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12),
  0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--color-border-2);
  box-sizing: border-box;
  background: var(--color-bg-popup);
}
</style>
