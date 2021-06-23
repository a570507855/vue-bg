import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/components/layout'
import config from '@/settings'

Vue.use(Router);

const menu = config.menu;
let routes = menu.reduce((memo, item) => {
  if (!item.children.length) {
    memo.push({
      path: item.route,
      component: layout,
      children: [{
        path: item.route,
        name: item.route,
        component: resolve => require([`@/views${item.route}`], resolve),
        meta: {
          title: item.name,
        }
      }]
    })
  } else {
    memo.push(...item.children.reduce((cmemo, citem) => {
      cmemo.push({
        path: citem.route,
        component: layout,
        children: [{
          path: citem.route,
          name: citem.route,
          component: resolve => require([`@/views${citem.route}`], resolve),
          meta: {
            title: citem.name,
          }
        }]
      });
      return cmemo;
    }, []));
  }
  return memo;
}, []);

export const constantRoutes = [{
    path: '/',
    component: layout,
    redirect: '/main/index',
    hidden: true
  },
  {
    path: '/main/index',
    component: layout,
    children: [{
      path: '/main/index',
      name: 'main/index',
      component: () => import('@/views/main/index'),
      meta: {
        title: '后台',
      }
    }],
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  ...routes
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