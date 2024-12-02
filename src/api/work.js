import request from '@/utils/request'

// 查询工单列表
export function listWork_order(query) {
  return request({
    url: '/park/work_order/list',
    method: 'get',
    params: query
  })
}

// 查询工单详细
export function getWork_order(id) {
  return request({
    url: '/park/work_order/' + id,
    method: 'get'
  })
}

// 新增工单
export function addWork_order(data) {
  return request({
    url: '/park/work_order',
    method: 'post',
    data: data
  })
}

// 新增工单-工作流
export function addWork_order_auto(data) {
  return request({
    url: '/activity/workorder',
    method: 'post',
    data: data
  })
}
// 修改工单
export function updateWork_order(data) {
  return request({
    url: '/park/work_order',
    method: 'put',
    data: data
  })
}
export function updateWork_order_auto(data) {
  return request({
    url: '/activity/workorder',
    method: 'put',
    data: data
  })
}
// 删除工单
export function delWork_order(id) {
  return request({
    url: '/park/work_order/' + id,
    method: 'delete'
  })
}
// 查询广告位列表
export function listAdv(query) {
  return request({
    url: '/park/advertising/list',
    method: 'get',
    params: query
  })
}
// 查询项目列表
export function listProject(query) {
  return request({
    url: '/park/project/list',
    method: 'get',
    params: query
  })
}
// 查询楼宇建筑列表
export function listBuild(query) {
  return request({
    url: '/park/build/list',
    method: 'get',
    params: query
  })
}
