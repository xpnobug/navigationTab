<script setup lang="ts">
  import { fileExtendNameIconMap, imageTypeList } from '@/constant/file';
  import type { FileItem } from '@/api/system/file';
  import SvgIcon from '@/components/svg-icon/index.vue';
  import { Icon } from '@arco-design/web-vue';
  const IconFont = Icon.addFromIconFontCn({ src: '//at.alicdn.com/t/c/font_1898478_pmwl83cddk.js' });
  interface Props {
    data: FileItem;
  }

  const props = withDefaults(defineProps<Props>(), {});

  // 是否是图片类型文件
  const isImage = computed(() => {
    return imageTypeList.includes(props.data.extension.toLowerCase());
  });

  // 获取文件图标，如果是图片这显示图片
  const getFileImg = computed<string>(() => {
    if (imageTypeList.includes(props.data.extension.toLowerCase())) {
      return props.data.url || '';
    }
    if (
      !Object.keys(fileExtendNameIconMap).includes(
        props.data.extension.toLowerCase(),
      )
    ) {
      return fileExtendNameIconMap.other || '';
    }
    return fileExtendNameIconMap[props.data.extension.toLowerCase()] || '';
  });
</script>

<template>
  <img v-if="isImage" class="img" :src="props.data.url || ''" alt="" />
<!--  <SvgIcon v-else :icon-class="getFileImg" style="height: 100%; width: 100%" />-->
  <IconFont v-else :type="getFileImg" style="height: 100%; width: 100%" />
</template>

<style lang="less" scoped>
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
