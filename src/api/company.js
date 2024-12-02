import request from '@/utils/request'
// 企业入驻
export function companyAdd(data) {
  return request({
    url: '/portal/company/save',
    method: 'post',
    data
  })
}
// 更新企业信息
export function companyUpdate(data) {
  return request({
    url: '/portal/company/update',
    method: 'post',
    data
  })
}
// 获取企业信息
export function getCompanyInfo(id, ip) {
  return request({
    url: `/portal/company/center/info/${id}`,
    method: 'get',
    params: {
      userIp: ip
    }
  })
}
// 获取企业列表信息
export function getCompanyList(params) {
  return request({
    url: `/portal/company/center/list`,
    method: 'get',
    params
  })
}
// 获取电商平台
export function getPlatformList(params) {
  return request({
    url: `/portal/center/provider/listByMap`,
    method: 'get',
    params
  })
}
// 获取归属企业列表信息
export function getOwnCompanyList() {
  return request({
    url: `/portal/company/getbyCreate`,
    method: 'get'
  })
}
// 模糊查询企业名称列表
export function getSearchCompanyList() {
  return request({
    url: `/portal/company/center/companyNamelist`,
    method: 'get'
  })
}
// 产品和需求
// 查询全局产品
export function getProductList(params) {
  return request({
    url: `/portal/supplydemand/center/list`,
    method: 'get',
    params
  })
}
// 查询用户产品列表
export function getProductListOwner(params) {
  return request({
    url: `/portal/supplydemand/listowner`,
    method: 'get',
    params
  })
}
// 查看详情
export function getProductDetail(id, ip) {
  return request({
    url: `/portal/supplydemand/center/info/${id}`,
    method: 'get',
    params: {
      userIp: ip
    }
  })
}
// 新增产品或需求
export function addProduct(data) {
  return request({
    url: `/portal/supplydemand/save`,
    method: 'post',
    data
  })
}
// 修改产品或需求
export function updateProduct(data) {
  return request({
    url: `/portal/supplydemand/update`,
    method: 'post',
    data
  })
}
// 删除产品或需求
export function removeProduct(ids) {
  return request({
    url: `/portal/supplydemand/delete`,
    method: 'post',
    data: JSON.stringify(ids)
  })
}
// 上架产品或需求
export function putonProduct(ids) {
  return request({
    url: `/portal/supplydemand/puton`,
    method: 'post',
    data: JSON.stringify(ids)
  })
}
// 下架产品或需求
export function putoffProduct(ids) {
  return request({
    url: `/portal/supplydemand/putoff`,
    method: 'post',
    data: JSON.stringify(ids)
  })
}
// 新增海外仓
export function addWarehouse(data) {
  return request({
    url: `/portal/crossware/save`,
    method: 'post',
    data
  })
}
export function updateWarehouse(data) {
  return request({
    url: `/portal/crossware/update`,
    method: 'post',
    data
  })
}
// 查询海外仓-全局列表
export function getWarehouse(params) {
  return request({
    url: `/portal/center/crossware/list`,
    method: 'get',
    params
  })
}
// 查询海外仓
export function getWarehouseOwner(params) {
  return request({
    url: `/portal/crossware/listowner`,
    method: 'get',
    params
  })
}
// 获取海外仓详情
export function getWarehouseDetail(id) {
  return request({
    url: `/portal/center/crossware/info/${id}`,
    method: 'get'
  })
}
// 删除海外仓
export function removeWarehouse(ids) {
  return request({
    url: `/portal/crossware/delete`,
    method: 'post',
    data: ids
  })
}
// 海外仓 上架
export function putonWarehouse(ids) {
  return request({
    url: `/portal/crossware/puton`,
    method: 'post',
    data: ids
  })
}
// 海外仓 下架
export function putoffWarehouse(ids) {
  return request({
    url: `/portal/crossware/putoff`,
    method: 'post',
    data: ids
  })
}
