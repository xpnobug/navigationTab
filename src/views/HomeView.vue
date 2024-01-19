<template>
  <a-layout style="height: 100%;">
    <a-layout-sider breakpoint="lg" collapsed-width="0" @collapse="onCollapse" @breakpoint="onBreakpoint"
                    v-model:collapsed="collapsed" :trigger="null" collapsible theme="light">
      <div class="logo">
        <icon-font type="icon-a-007_zhishichanquan"/>
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="light" mode="inline" class="menu-style">
        <!-- 使用v-for遍历menuData并渲染菜单项 -->
        <template v-for="item in menuData">
          <a-menu-item :key="item.path" v-if="!item.children" @click="handleMenuItemClick(item)">
            <icon-font :type="item.meta.icon"/>
            <span>{{ item.meta.title }}</span>
          </a-menu-item>
          <!-- 渲染子菜单项 -->
          <a-sub-menu v-if="item.children && item.children.length > 0" :key="item.path">
            <template #title>
              <icon-font :type="item.meta.icon"/>
              <span>{{ item.meta.title }}</span>
            </template>
            <a-menu-item v-for="child in item.children" :key="child.path" @click="handleMenuItemClick(child)">
              <icon-font :type="child.meta.icon"/>
              <span>{{ child.meta.title }}</span>
            </a-menu-item>
          </a-sub-menu>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)"/>
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)"/>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff' }">
        <div>
          <RouterView/>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import {ref} from 'vue';
import {RouterView, useRouter} from 'vue-router';
import {clearMenuItem, getMenuData} from '@ant-design-vue/pro-layout';
import {createFromIconfontCN, MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons-vue';
import {message} from 'ant-design-vue';

const change = (affixed: boolean) => {
  console.log(affixed);
};

const router = useRouter();
const selectedKeys = ref<string[]>(['1']);
const collapsed = ref<boolean>(false);

const onCollapse = (collapsed: boolean, type: string) => {
  console.log(collapsed, type);
};

const onBreakpoint = (broken: boolean) => {
  console.log(broken);
};

//获取菜单数据
const {menuData} = getMenuData(clearMenuItem(router.getRoutes()));
// 判断menuData是否成功获取
if (menuData && menuData.length > 0) {
  message.success('菜单渲染成功');
} else {
  message.error('菜单加载失败');
}

const handleMenuItemClick = (item) => {
  const routeName = item.name; // 使用菜单项的name属性作为路由名称
  router.push({name: routeName, params: item.params});
  console.log(routeName, item.params)
};
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_1898478_az5nroxqmv4.js',
});
</script>

<style scoped>
.icons-list :deep(.anticon) {
  margin-right: 6px;
  font-size: 24px;
}

.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}

.menu-style {
  position: fixed;
  width: 200px;
}

@media (max-width: 768px) {
  .menu-style {
    position: static;
    width: 100%;
  }
}
</style>
  