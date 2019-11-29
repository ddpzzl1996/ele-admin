export function getStatus(status) {
  const statusMap = { // 订单状态
    1: '待接单',
    2: '服务中',
    3: '待确认',
    4: '待入库',
    5: '已完成',
    6: '已取消',
    7: '入库中'
  }
  return statusMap[Number(status)]
}
export function usertype(status) {
  const statusMap = { // 订单状态
    2: '回收员',
    3: '代丢员',
    4: '入库员',
    5: '运营员'
  }
  return statusMap[Number(status)]
}
