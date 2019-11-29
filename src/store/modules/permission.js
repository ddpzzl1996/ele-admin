import { asyncRoutes, constantRoutes } from '@/router'
import Layout from '@/layout/index'
// 所有的注册异步路由列表
const arr = []
for (const key in asyncRoutes) {
  arr.push(asyncRoutes[key])
}

/**
 * 根据后台返回数据组装菜单
 * @param menus
 * @param first
 */
function assemblyRouter(menus, first) {
  const res = {}
  const menuConfig = asyncRoutes[menus.code]
  if (!menuConfig && !first) {
    return
  }
  res.redirect = '/' + menus.children[0].code
  res.path = first ? '/' + menus.code : menus.code
  // res.component = first ? Layout : menuConfig.component
  res.component = Layout
  res.name = menus.code || menuConfig.code
  if (menuConfig && menuConfig.hidden) {
    res.hidden = menuConfig.hidden
  }
  res.meta = {
    title: menus.name || menuConfig.name,
    icon: menus.code,
    menuCode: menus.code
  }
  return res
}

/**
 * 递归过滤异步路由表
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    // console.log(tmp.children)
    // 获取一级路由
    const menuMap = assemblyRouter(tmp, true)
    if (menuMap) {
      // 获取二级路由 如果二级路由有的话
      if (tmp.children.length) {
        menuMap.children = filterAsyncRouterTwo(tmp.children, false)
        // 重定向去一级菜单的第一个二级菜单
        menuMap.redirect = '/' + tmp.children[0].code
      }
      res.push(menuMap)
    }
  })
  return res
}
/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouterTwo(routes, first) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    // 解析二级路由
    const menuMap = assemblyRouterTwo(tmp, true)
    if (menuMap.name == 'promoterData') {
      console.log(menuMap, '二级路由')
    }
    // if (menuMap.children) {
    //   // 有三级路由
    //   menuMap.children.forEach((item) => {
    //     const resT = {}
    //     resT.path = item.path
    //     resT.component = item.component || Layout
    //     resT.name = item.name
    //     // resT.hidden = item.hidden
    //     resT.meta = {
    //       title: item.title,
    //       menuCode: item.path
    //     }
    //     // res.children = resT
    //   })
    //   // menuMap.children = null
    // }
    res.push(menuMap)
  })
  return res
}
// 三级路由及以后处理
// function assemblyRouteThree(menus) {
//   // 三级路由以后还有路由
//   if (menus.children) {
//     menus.children.forEach(route => {
//       const tmp = { ...route }
//       console.log(tmp, '三级路由')
//       // 解析三级路由
//       menus.children = assemblyRouteThree(tmp, true)
//     })
//   }
//   return menus
// }
/**
 * 根据后台返回数据组装菜单
 * @param menus
 * @param first
 */
function assemblyRouterTwo(menus, first) {
  const res = {}
  const menuConfig = asyncRoutes[menus.code]
  if (!menuConfig && !first) {
    return
  }
  res.path = '/' + menus.code
  if (menuConfig) {
    res.component = menuConfig.component || Layout
  }
  res.name = menus.code || menuConfig.name
  if (menuConfig && menuConfig.hidden) {
    res.hidden = menuConfig.hidden
  }
  if (menuConfig && menuConfig.children) {
    res.children = menuConfig.children
  }
  res.meta = {
    title: menus.name || menuConfig.name,
    menuCode: menus.code
  }
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    // roles为后台返回路由列表
    return new Promise(resolve => {
      console.log(roles)
      const accessedRouters = filterAsyncRoutes(roles)
      // 过滤所有动态路由
      commit('SET_ROUTES', accessedRouters)
      resolve(accessedRouters)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
