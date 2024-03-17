<script setup lang="ts">
import '@arco-design/web-vue/dist/arco.css';
import {fileTypeList, type fileTypeListItem} from '@/constant/file';
import { Icon } from '@arco-design/web-vue';
const IconFont = Icon.addFromIconFontCn({ src: '//at.alicdn.com/t/c/font_1898478_qk3tcjfa6nc.js' });
const route = useRoute();
const router = useRouter();

const selectedKey = ref('0');

// 监听路由变化
watch(
    () => route.query,
    () => {
      if (route.query.type) {
        selectedKey.value = route.query.type as string;
      }
    },
    {
      immediate: true,
    },
);

// 点击事件
const onClickItem = (item: fileTypeListItem) => {
  router.push({name: 'File', query: {type: item.value}});
};
</script>

<template>
  <div>
    <arco-card
        title="文件管理"
        :bordered="false"
        :body-style="{ padding: 0 }"
    >
      <arco-menu :default-open-keys="['0']" :selected-keys="[selectedKey]">
        <arco-sub-menu key="0">
          <template #icon>
            <icon-apps></icon-apps>
          </template>
          <template #title>文件类型</template>
          <arco-menu-item
              v-for="item in fileTypeList"
              :key="item.value.toString()"
              @click="onClickItem(item)"
          >
            <template #icon>
              <icon-font :type="item.icon"
                       style="height: 28px; width: 28px"></icon-font>
            </template>
            <span>{{ item.name }}</span>
          </arco-menu-item>
        </arco-sub-menu>
      </arco-menu>
    </arco-card>
  </div>
</template>

<style lang="less" scoped>
:deep(.arco-card) {
  .arco-card-header {
    border-bottom-style: dashed;
    margin: 0 16px;
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
