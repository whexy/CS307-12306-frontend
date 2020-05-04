import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '12307火车订票系统', icon: 'dashboard' }
    }]
  },

  {
    path: '/order',
    component: Layout,
    children: [{
      path: '',
      name: 'order',
      component: () => import('@/views/order/index'),
      meta: { title: '订票', icon: 'train_station' }
    }],
    hidden: true
  },

  {
    path: '/myOrder',
    component: Layout,
    redirect: '/myOrder',
    children: [{
      path: 'index',
      name: 'myOrder',
      component: () => import('@/views/myOrder/index'),
      meta: { title: '我的火车票', icon: 'train_station' }
    }]
  },

  {
    path: '/station_query',
    component: Layout,
    redirect: '/station_query',
    children: [{
      path: 'index',
      name: 'station_query',
      component: () => import('@/views/station_query/index'),
      meta: { title: '火车站站点查询', icon: 'train_station' }
    }]
  },

  {
    path: 'external-link',
    component: Layout,
    meta: { title: '项目GitHub地址', icon: 'link' },
    children: [
      {
        path: 'https://github.com/whexy/CS307-12306-frontend',
        meta: { title: '项目前端GitHub' }
      },
      {
        path: 'https://github.com/whexy/CS307-12306',
        meta: { title: '项目后端GitHub' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
