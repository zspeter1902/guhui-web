import request from '@/utils/request'
// 账号登录
export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}
// 账号注册
export function register(data) {
  return request({
    url: '/auth/register',
    method: 'post',
    data
  })
}
// 重置密码
export function resetPwd(data) {
  return request({
    url: '/system/user/resetPwd',
    method: 'put',
    data
  })
}
/**
 * 获取图片验证码
 * @Arraybuffer @Blob uuid
 * */
export function getCaptcha() {
  return request({
    url: '/code',
    method: 'get'
  })
}
// 查询用户列表
export function listUser(query) {
  return request({
    url: '/system/user/list',
    method: 'get',
    params: query
  })
}
// 查询楼层列表
export function listFloor(query) {
  return request({
    url: '/park/floor/list',
    method: 'get',
    params: query
  })
}
// 查询停车位列表
export function listParking(query) {
  return request({
    url: '/park/parking/list',
    method: 'get',
    params: query
  })
}
// 获取邮箱验证码
export function getEmailCaptcha(data) {
  return request({
    url: '/thirdparty/center/sendEmail',
    method: 'post',
    data
  })
}
// 获取用户邮箱
export function getUserEmail(userName) {
  return request({
    url: '/system/admin/userForPwd',
    method: 'get',
    params: {
      userName
    }
  })
}
// 检验用户名、手机号、邮箱
export function checkUser(data) {
  return request({
    url: '/system/admin/checkUser',
    method: 'post',
    data
  })
}
// 找回密码
export function findPassword(data) {
  return request({
    url: '/system/admin/retrievePsd',
    method: 'post',
    data
  })
}
// 修改密码
export function changePassword(params) {
  return request({
    url: '/system/user/profile/updatePwd',
    method: 'put',
    params
  })
}
// 验证管理员
export function checkAdmin() {
  return request({
    url: '/system/user/checkAdmin',
    method: 'get'
  })
}

// 获取导航菜单
export function getNavMenuList() {
  return request({
    url: '/system/center/menu/list',
    method: 'get'
  })
}
export function getNavMenu(type = 3) {
  return request({
    url: `/portal/center/menus/platform`,
    method: 'get',
    params: {
      type
    }
  })
}
// 获取开通服务
export function getOpenService() {
  return request({
    url: `/portal/companyservice/listByMap`,
    method: 'get',
    params: {
      examineFlag: 1
    }
  })
}
export function getHaveApplyService() {
  return request({
    url: `/portal/dict/service`,
    method: 'post',
    data: {
      dictParentCode: 'portal_service'
    }
  })
}
// 收藏 1 产品 2 企业
export function getCollectList(type, data) {
  const types = {
    'product': 1,
    'company': 2
  }
  return request({
    url: `/portal/companycollect/list`,
    method: 'get',
    params: {
      type: types[type],
      ...data
    }
  })
}
// 添加收藏
export function addCollect(type, id) {
  const types = {
    'product': 1,
    'company': 2
  }
  return request({
    url: `/portal/companycollect/save`,
    method: 'post',
    data: {
      targetId: id,
      type: types[type]
    }
  })
}
// 取消收藏
export function removeCollect(ids) {
  return request({
    url: `/portal/companycollect/delete`,
    method: 'post',
    data: JSON.stringify(ids)
  })
}
// 立即咨询
export function promptlyConsult(data) {
  return request({
    url: `/portal/companymsg/center/save`,
    method: 'post',
    data
  })
}
// 退出登录
export function logout() {
  return request({
    url: '/auth/logout',
    method: 'delete'
  })
}
