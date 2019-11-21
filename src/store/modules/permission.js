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
  console.log(menuConfig)
  if (!menuConfig && !first) {
    return
  }
  res.path = first ? '/' + menus.code : menus.code
  // res.component = first ? Layout : menuConfig.component
  res.component = Layout
  res.name = menus.code || menuConfig.code
  if (menuConfig && menuConfig.hidden) {
    res.hidden = menuConfig.hidden
  }
  // if (menuConfig) {
  //   icon = menuConfig.icon
  // }
  res.meta = {
    title: menus.name || menuConfig.name,
    // icon: icon || 'user',
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
  console.log(routes, '所有路由')
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    // console.log(tmp.children)
    // 获取一级路由
    const menuMap = assemblyRouter(tmp, true)
    if (menuMap) {
      // 获取二级路由 如果二级路由有的话
      if (tmp.children.length) {
        menuMap.children = filterAsyncRouterTwo(tmp.code, tmp.children, false)
        // 重定向去一级菜单的第一个二级菜单
        menuMap.redirect = menuMap.path + '/' + tmp.children[0].code
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
function filterAsyncRouterTwo(menuIdOne, routes, first) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    // 解析二级路由
    const menuMap = assemblyRouterTwo(tmp, true)
    res.push(menuMap)
  })
  return res
}

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
    console.log(Layout)
    res.component = menuConfig.component || Layout
  }
  res.name = menus.code || menuConfig.name
  if (menuConfig && menuConfig.hidden) {
    res.hidden = menuConfig.hidden
  }
  // 递归
  if (menuConfig && menuConfig.children) {
    menuConfig.children.forEach(route => {
      const tmp = { ...route }
      // 解析三级路由
      res.children = assemblyRouterTwo(tmp, true)
    })
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
