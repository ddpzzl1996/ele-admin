import request from '@/utils/request'

export function verify(data) {
  return request({
    url: '/admin/verify',
    method: 'post',
    data
  })
}

export function login(data) {
  return request({
    url: '/admin/admin/front/loginData.do',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  return request({
    url: '/admin/admin/front/userMenu.do',
    method: 'post',
    data
  })
}
// 基础配置查询
export function getUserManagerList(data) {
  return request({
    url: '/admin/admin/front/userList.do',
    method: 'post',
    data
  })
}
// 基础配置组织机构查询
export function getOrganization(data) {
  return request({
    url: '/admin/admin/front/userOrg.do',
    method: 'post',
    data
  })
}
// 新增用户
export function addUers(data) {
  return request({
    url: '/admin/admin/front/userAdd.json',
    method: 'post',
    data
  })
}
// 删除用户
export function deleteUers(data) {
  return request({
    url: '/admin/admin/front/userDelete.do',
    method: 'post',
    data
  })
}
// 修改密码
export function updataPwd(data) {
  return request({
    url: '/admin/admin/front/changeUserPassword.json',
    method: 'post',
    data
  })
}
// 基础配置类型查询
export function typeValue(data) {
  return request({
    url: '/admin/admin/front/typeValue.do',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
