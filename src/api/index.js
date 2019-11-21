import request from '@/utils/request'

export function getData(data) {
  return request({
    url: '/admin/admin/echarts/data',
    method: 'post',
    data
  })
}
