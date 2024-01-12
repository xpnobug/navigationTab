import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import Antd from 'ant-design-vue';
import ProLayout, { PageContainer } from '@ant-design-vue/pro-layout';
import 'ant-design-vue/dist/reset.css';

const app = createApp(App);

// 使用Pinia
app.use(createPinia());

// 使用路由
app.use(router);

// 使用Ant Design Vue插件
app.use(Antd);
app.use(ProLayout);
app.use(PageContainer);

app.mount('#app');
