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

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
