import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
let path = 'main/index'; //important!!! 

export const constantRoutes = [{
    path: '/main/index',
    component: process.env.NODE_ENV === 'development' ? () => import('@/views/main/index') : () => import(
      /*webpackMode:'eager' */
      /* webpackChunkName: "base" */
      `@/views/${path}`),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    redirect: '/main/index',
    hidden: true
  },
]
const createRouter = () => new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
});

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

export default router;