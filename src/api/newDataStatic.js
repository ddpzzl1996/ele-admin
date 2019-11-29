/**
 * 所有数据统计类接口
 */
import request from '@/utils/request'
/**
 * 查询推广人员列表
 * "count": "string",
  "createTime": "string",
  "endTime": "string",
  "limit": 0,
 * @param {*} data
 */
export function getList(data) {
  return request({
    url: '/admin/admin/front/data/queryQromoterList.do',
    method: 'post',
    data
  })
}
// 推广明细
export function getDetails(data) {
  return request({
    url: '/admin/admin/front/data/queryQromoterOrder.json',
    method: 'post',
    data
  })
}
/**
 * 回收员列表
 */
export function getRecoverList(data) {
  return request({
    url: '/admin/admin/front/data/queryCollectorList.do',
    method: 'post',
    data
  })
}
/**
 * 回收员明细
 */
export function getRecoverDetails(data) {
  return request({
    url: '/admin/admin/front/data/queryStorageDetailList.json',
    method: 'post',
    data
  })
}
/**
 * 入库员列表
 */
export function getStorageList(data) {
  return request({
    url: '/admin/admin/front/data/queryStorageList.do',
    method: 'post',
    data
  })
}
/**
 * 回收员明细
 */
export function getStorageDetails(data) {
  return request({
    url: '/admin/admin/front/data/queryStorageObjectList.json',
    method: 'post',
    data
  })
}
/**
 * 仓库列表
 */
export function getSysStorageData(data) {
  return request({
    url: '/admin/admin/front/data/querySysStorageList.do',
    method: 'post',
    data
  })
}
/**
 * 仓库地区
 */
export function queryApiArea(data) {
  return request({
    url: '/admin/admin/front/data/queryApiArea.json',
    method: 'post',
    data
  })
}
/**
 * 仓库详情
 */
export function getSysStorageDetails(data) {
  return request({
    url: '/admin/admin/front/data/querySysStorageDetail.json',
    method: 'post',
    data
  })
}
/**
 * 分类数据
 */
export function queryTypeData(data) {
  return request({
    url: '/admin/admin/front/data/queryTypeData.do',
    method: 'post',
    data
  })
}
/**
 * 普通用户数据
 */
export function cuserData(data) {
  return request({
    url: '/admin/admin/front/data/queryCuserDataList.do',
    method: 'post',
    data
  })
}
/**
 * 普通用户详情
 */
export function cuserDetails(data) {
  return request({
    url: '/admin/admin/front/data/queryCuserDataDetail.json',
    method: 'post',
    data
  })
}
