<script setup lang="ts">
import FileAside from './main/FileAside.vue';
import FileMain from './main/FileMain/index.vue';


defineOptions({name: 'FileIndex'});
</script>

<template>
  <div>
    <arco-row align="stretch" :gutter="14" class="file-manage">
      <arco-col
          :xs="0"
          :sm="8"
          :md="7"
          :lg="6"
          :xl="5"
          :xxl="4"
          flex="220px"
          class="h-full ov-hidden"
      >
        <FileAside></FileAside>
      </arco-col>
      <arco-col
          :xs="24"
          :sm="16"
          :md="17"
          :lg="18"
          :xl="19"
          :xxl="20"
          flex="1"
          class="h-full ov-hidden"
      >
        <FileMain></FileMain>
      </arco-col>
    </arco-row>
  </div>
</template>

<style lang="less" scoped>
.container-breadcrumb {
  margin-left: 16px;
}

.file-manage {
  flex: 1;
  padding: 0 16px 16px 16px;
  overflow: hidden;
}
</style>
