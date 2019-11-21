import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // 在白名单重定向中

router.beforeEach(async(to, from, next) => {
  // 开始进度条
  NProgress.start()
  // 设置页面标题
  document.title = getPageTitle(to.meta.title)
  // 确定用户是否已登录
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // 如果已登录，请重定向到主页
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo !== '') {
        next()
      } else {
        try {
          // 获取用户信息
          // await store.dispatch('user/getInfo')
          const roles = await store.dispatch('user/getInfo')
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          console.log(accessRoutes, '处理完成之后路由')
          const route404 = { path: '*', redirect: '/404', hidden: true }
          accessRoutes.push(route404)
          router.addRoutes(accessRoutes)
          next()
        } catch (error) {
          // 移除token并转到登录页以重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login`)
          NProgress.done()
        }
      }
    }
  } else {
    /* 没有 token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免费登录白名单中，直接进入
      next()
    } else {
      // 没有访问权限的其他页将重定向到登录页。
      next(`/login`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 完成进度条
  NProgress.done()
})
