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
 * 没有权限要求的基础页面
 * 所有角色可以访问
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'), // 登录
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
    title: '主页',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      title: '主页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '主页', icon: 'dashboard' }
    }]
  }
  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

/**
 * asnycRoutes
 * 需要根据用户角色动态加载的路由
*/
export const asyncRoutes = {
  // 基础管理
  basicManager: {
    name: '基础管理',
    redirect: '/UserManager',
    meta: { title: '基础管理', icon: 'example' }
  },
  // 数据统计
  NewDataStatic: {
    name: '数据统计',
    meta: { title: '数据统计', icon: 'NewDataStatic' }
  },
  // 用户管理
  UserManager: {
    name: 'UserManager',
    path: '/UserManager',
    redirect: '/UserManager',
    meta: { title: '用户管理', icon: 'userManager' },
    component: () => import('@/views/userManager/index')
  },
  // 推广员统计
  promoterData: {
    name: 'promoterData',
    path: '/promoterData',
    redirect: '/promoterData',
    alwaysShow: true,
    meta: { title: '推广员统计', icon: 'ProStatistics' },
    component: () => import('@/views/promoterData/index'),
    // 明细
    children: [{
      path: '/PromotionDetails/:id',
      name: 'PromotionDetails',
      hidden: true,
      title: '推广明细',
      component: () => import('@/views/promotionDetails/index')
    }]
  },
  // 回收员统计
  CollectorList: {
    name: 'collectorList',
    path: '/collectorList',
    redirect: '/collectorList',
    alwaysShow: true,
    meta: { title: '回收员统计', icon: 'collectorList' },
    component: () => import('@/views/collectorList/index'),
    // 明细
    children: [{
      path: '/CollectorDetails/:id',
      name: 'CollectorDetails',
      hidden: true,
      title: '推广明细',
      component: () => import('@/views/collectorDetails/index')
    }]
  },
  // 入库员统计
  StorageData: {
    name: 'StorageData',
    path: '/StorageData',
    redirect: '/StorageData',
    alwaysShow: true,
    meta: { title: '回收员统计', icon: 'StorageData' },
    component: () => import('@/views/storageData/index'),
    // 明细
    children: [{
      path: '/StorageDetails/:id',
      name: 'StorageDetails',
      hidden: true,
      title: '推广明细',
      component: () => import('@/views/storageDetails/index')
    }]
  },
  // 仓库数据
  SysStorageData: {
    name: 'SysStorageData',
    path: '/SysStorageData',
    redirect: '/SysStorageData',
    alwaysShow: true,
    meta: { title: '仓库数据', icon: 'SysStorageData' },
    component: () => import('@/views/sysStorageData/index'),
    // 明细
    children: [{
      path: '/sysStorageDetails/:id',
      name: 'sysStorageDetails',
      hidden: true,
      title: '推广明细',
      component: () => import('@/views/sysStorageDetails/index')
    }]
  },
  // 分类数据
  queryTypeData: {
    name: 'queryTypeData',
    path: '/queryTypeData',
    redirect: '/queryTypeData',
    alwaysShow: true,
    meta: { title: '分类数据', icon: 'queryTypeData' },
    component: () => import('@/views/queryTypeData/index')
  },
  // 普通用户数据
  CuserData: {
    name: 'CuserData',
    path: '/CuserData',
    redirect: '/CuserData',
    alwaysShow: true,
    meta: { title: '普通用户数据', icon: 'CuserData' },
    component: () => import('@/views/cuserData/index'),
    // 明细
    children: [{
      path: '/CuserDetails/:id',
      name: 'CuserDetails',
      hidden: true,
      title: '推广明细',
      component: () => import('@/views/cuserDetails/index')
    }]
  },
  // 用户订单
  OrderData: {
    name: 'OrderData',
    path: '/OrderData',
    redirect: '/OrderData',
    alwaysShow: true,
    meta: { title: '普通用户数据', icon: 'OrderData' },
    component: () => import('@/views/orderData/index'),
    // 明细
    children: [{
      path: '/OrderDetails/:id',
      name: 'OrderDetails',
      hidden: true,
      title: '订单明细',
      component: () => import('@/views/orderDetails/index')
    }]
  },
  // 入库订单
  StorageOrder: {
    name: 'StorageOrder',
    path: '/StorageOrder',
    redirect: '/StorageOrder',
    alwaysShow: true,
    meta: { title: '入库订单', icon: 'OrderData' },
    component: () => import('@/views/storageOrder/index')
    // 明细
    // children: [{
    //   path: '/OrderDetails/:id',
    //   name: 'OrderDetails',
    //   hidden: true,
    //   title: '订单明细',
    //   component: () => import('@/views/orderDetails/index')
    // }]
  },
  // 客户统计
  CustomerManager: {
    name: 'CustomerManager',
    path: '/CustomerManager',
    redirect: '/CustomerManager',
    meta: { title: '客户统计', icon: 'CustomerManager' },
    component: () => import('@/views/customerManager/index')
  }
}

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
