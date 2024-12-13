import request from '@/utils/request'
// 文件上传
export function uploadFile(remotePath, data) {
  data['cancelHttp'] = true
  return request({
    url: `/thirdparty/third/upload/${remotePath}`,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}
// 文件下载
export function downloadFile(remotePath, fileName) {
  return request({
    url: `/thirdparty/third/download/${remotePath}/${fileName}`,
    responseType: 'arraybuffer',
    method: 'get'
  })
}
// 文件删除
export function removeFile(ids) {
  return request({
    url: `/thirdparty/file/delete`,
    method: 'post',
    data: {
      ids
    }
  })
}
// 字典查询
export function getDictList(dictType) {
  return request({
    url: `/portal/center/dict/tree`,
    method: 'post',
    data: {
      dictType,
      cancelHttp: true
    }
  })
}
// 字典查询Map
export function getDictMap(dictParentCode) {
  return request({
    url: `/portal/center/dict/getMapByParent`,
    method: 'post',
    data: {
      dictParentCode,
      cancelHttp: true
    }
  })
}
// 字典分页查询
export function getDictListPage(key, page = 1, limit = 10) {
  return request({
    url: `/portal/center/dict/pagetree`,
    method: 'get',
    params: {
      key,
      page,
      limit
    }
  })
}
// 字典条件查询
export function getDictListFilter(data) {
  return request({
    url: `/portal/center/dict/getByParams`,
    method: 'post',
    data
  })
}
// 字典详情查询
export function getDictDetail(dictcode) {
  return request({
    url: `/system/dict/data/type/${dictcode}`,
    method: 'get'
  })
}

// 产品小分类
export function getProductType() {
  return request({
    url: `/portal/category/center/list/tree`,
    method: 'get'
  })
}
// 获取banner
export function getHomeBanner() {
  return request({
    url: `/thirdparty/file/center/list`,
    method: 'get',
    params: {
      // key: 'center/banner',
      remotePath: 'center/banner'
    }
  })
}
export function getRestaurantCodeList() {
  return request({
    url: `/thirdparty/file/center/list`,
    method: 'get',
    params: {
      remotePath: 'center/restaurant-code'
    }
  })
}
// 获取客服人员
export function getCustomer() {
  return request({
    url: `/sys/config/valueByKey/customer_service`,
    method: 'get'
  })
}
// 获取聊天记录
export function getChatRecord(userName, userTarget, page) {
  return request({
    url: `/thirdparty/socketmessage/center/list`,
    method: 'get',
    params: {
      userName,
      userTarget,
      page
    }
  })
}
// 获取未读消息
export function getUnread(userTo, userFrom) {
  return request({
    url: `/thirdparty/socketmessage/center/listNotRead`,
    method: 'get',
    params: {
      userTo,
      userFrom
    }
  })
}
// 标记为已读
export function changeRead(userFrom, userTo) {
  return request({
    url: `/thirdparty/socketmessage/center/updataStatus`,
    method: 'post',
    data: {
      userFrom, // 邮件发来的用户名
      userTo // 当前登录用户名
    }
  })
}
// 获取常见问题列表
/**
 *
 * @param {string} question 问题名称=>精确
 * @param {string} keyword 问题=>简称
 * @param {string} plate 问题类别
 * @param {string} key 模糊查询
 * question keyword 不同时使用
 * @returns
 */
export function getQuestionList(params) {
  return request({
    url: `/thirdparty/commonquestion/center/list`,
    method: 'get',
    params
  })
}
