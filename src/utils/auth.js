import VueCookie from 'vue-cookie'
const TokenKey = 'token'
const Name = 'userName'
const RefreshToken = 'refreshToken'
const Expire = 'expire'
const companyType = 'company-type'
const UserInfo = 'userInfo'

export function getToken() {
  return localStorage.getItem(TokenKey) || VueCookie.get(TokenKey)
}

export function setToken(token) {
  localStorage.setItem(TokenKey, token)
  VueCookie.set(TokenKey, token)
  // return localStorage.setItem(TokenKey, token) || VueCookie.set(TokenKey, token)
}

export function removeToken() {
  localStorage.removeItem(TokenKey)
  VueCookie.delete(TokenKey)
  // return localStorage.removeItem(TokenKey) || VueCookie.delete(TokenKey)
}

export function getRefreshToken() {
  return localStorage.getItem(RefreshToken)
}

export function setRefreshToken(token) {
  return localStorage.setItem(RefreshToken, token)
}

export function removeRefreshToken() {
  return localStorage.removeItem(RefreshToken)
}

export function getName() {
  return localStorage.getItem(Name)
}
export function setName(name) {
  return localStorage.setItem(Name, name)
}

export function removeName() {
  return localStorage.removeItem(Name)
}


export function getCompanyType() {
  return localStorage.getItem(companyType)
}
export function setCompanyType(type) {
  return localStorage.setItem(companyType, type)
}

export function removeCompanyType() {
  return localStorage.removeItem(companyType)
}

export function getUserInfo() {
  return localStorage.getItem(UserInfo)
}
export function setUserInfo(info) {
  return localStorage.setItem(UserInfo, JSON.stringify(info))
}
export function removeUserInfo() {
  return localStorage.removeItem(UserInfo)
}
