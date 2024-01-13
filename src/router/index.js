import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue'
import Index01 from '../views/dashboard/index.vue'
// import index01 from '../views/dashboard/index.vue'
const hasGithubPages = import.meta.env.BASE_URL;

export default createRouter({
  history: hasGithubPages ? createWebHashHistory() : createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/site/mysite', //重定向到 /site/mysite
      component: HomeView,
      children: [
        {
          path: '/site',
          name: 'site',
          meta: { title: '常用站点', icon: 'icon-shouye', flat: true },
          redirect: () => ({ name: 'site' }),
          children: [
            {
              path: 'mysite',
              name: 'mysite',
              meta: { title: '我的', icon: 'icon-wode', },
              component: () => import('../views/siterouter/SiteLinkView.vue'),
            },
            {
              path: 'blog',
              name: 'blog',
              meta: { title: 'blog', icon: 'icon-jianli', flat: true },
              component: () => import('../components/blog/TreeViewComponents.vue'),
            },
            {
              path: 'tool',
              name: 'tool',
              meta: { title: '工具', icon: 'icon-gongju' },
              component: () => import('../views/siterouter/ToolView.vue'),
            },
            // {
            //   path: 'dynamic-match/:id(\\d+)',
            //   name: 'dynamic-match',
            //   // 路由 path 默认参数再 meta.params 里
            //   meta: { title: '动态参数页面', params: { id: 1 } },
            //   component: () => import('../views/dashboard/index.vue'),
            // },
          ],
        },
        {
          path: '/version',
          name: 'version',
          meta: { title: '单个菜单', icon: 'icon-wenjian' },
          component: () => import('../views/dashboard/index.vue'),
        },
      ]
    },

  ]
})

