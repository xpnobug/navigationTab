import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import Antd from 'ant-design-vue';
import ProLayout, { PageContainer } from '@ant-design-vue/pro-layout';
import 'ant-design-vue/dist/reset.css';

import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/dist/arco.css';

const app = createApp(App);

// 使用Pinia
app.use(createPinia());

app.use(Antd);
app.use(ArcoVueIcon);
app.use(ArcoVue, {
  // 用于改变使用组件时的前缀名称
  componentPrefix: 'arco'
});
// 使用路由
app.use(router);
app.use(ProLayout);
app.use(PageContainer);

app.mount('#app');
