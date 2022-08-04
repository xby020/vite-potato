import { App } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

// constant routes
const constantRouteList: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'main',
    component: () => import('@/layout/Layout.vue'),
    redirect: '/dashboard',
    meta: {
      title: '首页概览'
    },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/pages/dashboard/Dashboard.vue')
      }
    ]
  }
];

// route
const routes = [...constantRouteList];

const router = createRouter({
  history: createWebHistory(),
  routes: routes
});

export function setupRouter(app: App) {
  app.use(router);
}

export default router;
