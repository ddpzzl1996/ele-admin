export function getStatus(status) {
  const statusMap = { // 管道测试
    0: '有',
    1: '没有',
    2: '真没有'
  }
  return statusMap[Number(status)]
}
