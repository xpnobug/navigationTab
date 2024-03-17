import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router';
import Admin from '../views/admin/demo01.vue'
const hasGithubPages = import.meta.env.BASE_URL;

export default createRouter({
  history: hasGithubPages ? createWebHashHistory() : createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../views/admin/demo01.vue')
    },
    {
      path: '/newchat',
      name: 'newchat',
      component: () => import('../views/newchat/demo1/index.vue')
    },
    {
      path: '/demo2',
      name: 'demo2',
      component: () => import('../views/newchat/demo2/index.vue')
    },
    {
      path: '/maidemo1',
      name: 'maidemo1',
      component: () => import('../views/mai/demo2/views/virtual-waterfall-container.vue')
    },
    {
      path: '/admindemo',
      name: 'admindemo',
      component: () => import('../views/admin/admin.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      redirect: '/site/mysite', //重定向到 /site/mysite
      component: Admin,
      children: [
        {
          path: '/site',
          name: 'site',
          meta: {title: '常用站点', icon: 'icon-shouye', flat: true},
          redirect: () => ({name: 'site'}),
          children: [
            {
              path: 'mysite',
              name: 'mysite',
              meta: {title: '我的', icon: 'icon-wode',},
              component: () => import('../views/siterouter/BlogIndex.vue'),
            },
            {
              path: 'blog',
              name: 'blog',
              meta: {title: 'blog', icon: 'icon-jianli', flat: true},
              component: () => import('../components/blog/TreeViewComponents.vue'),
            },
            {
              path: 'tool',
              name: 'tool',
              meta: {title: '工具', icon: 'icon-gongju'},
              component: () => import('../views/siterouter/ToolView.vue'),
            },
            // {
            //   path: 'dynamic-match/:id(\\d+)',
            //   name: 'dynamic-match',
            //   // 路由 path 默认参数再 meta.params 里
            //   meta: { title: '动态参数页面', params: { id: 1 } },
            //   component: () => import('../views/dashboard/RendIndex.vue'),
            // },
          ],
        },

        {
          name: 'File',
          path: '/system/file',
          meta: {title: '文件管理'},
          children: [
            {
              name: 'File',
              path: '/system/file',
              meta: {title: '文件管理', icon: 'icon-gongju'},
              component: () => import('@/views/system/file/index.vue'),
            },
          ],
        },
        {
          name: 'newChat',
          path: '/system/newChat',
          meta: {title: '聊天系统', icon: 'icon-liaotian-zaixian'},
          children: [
            {
              name: 'newChat',
              path: '/system/newChat',
              component: () => import('@/views/newchat/demo2/index.vue'),
              meta: {title: '聊天系统', icon: 'icon-liaotian-zaixian'},
            },
          ],
        },
        {
          path: '/mai',
          name: 'mai',
          // component: () => import('../views/mai/demo/demo3.vue'),
          meta: {title: '套图管理', icon: 'icon-taotu'},
          children: [
            {
              path: '/mai',
              name: 'mai',
              component: () => import('../views/mai/demo/demo2.vue'),
              meta: {title: '套图管理', icon: 'icon-taotu'},
            },
          ],
        },
        // {
        //   path: '/mai',
        //   name: 'mai',
        //   // component: () => import('../views/mai/demo/demo3.vue'),
        //   meta: {title: '音乐管理', icon: 'icon-taotu'},
        //   children: [
        //     {
        //       path: '/mai',
        //       name: 'mai',
        //       component: () => import('../views/mai/demo/demo2.vue'),
        //       meta: {title: '音乐管理', icon: 'icon-taotu'},
        //     },
        //   ],
        // },
      ]

    }
  ]
})