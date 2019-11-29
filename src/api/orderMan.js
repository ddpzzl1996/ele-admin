import request from '@/utils/request'
// 用户订单
export function getList(data) {
  return request({
    url: '/admin/admin/front/order/queryOrderDataList.do',
    method: 'post',
    data
  })
}
// 订单详情
export function getOrderDetails(data) {
  return request({
    url: '/admin/admin/front/order/queryOrderDetailByNo.json',
    method: 'post',
    data
  })
}
// 指派工作人员
export function getRecoverList(data) {
  return request({
    url: '/admin/admin/front/order/queryCuserApiByType.json',
    method: 'post',
    data
  })
}
// 确定指派
export function updateApirec(data) {
  return request({
    url: '/admin/admin/front/order/updateApirecByOrderId.json',
    method: 'post',
    data
  })
}
// 取消订单
export function cancelOrder(data) {
  return request({
    url: '/admin/admin/front/order/cancelOrderData.json',
    method: 'post',
    data
  })
}
// 入库订单
export function StorageOrder(data) {
  return request({
    url: '/admin/admin/front/order/queryStorageApiList.do',
    method: 'post',
    data
  })
}
