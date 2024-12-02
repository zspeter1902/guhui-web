/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|http?:|mailto:|tel:)/.test(path)
}

/**
 * @param {str} arg
 * @returns {Boolean}
 */
export function isValidPhone(str) {
  const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/
  return reg.test(str)
}
/**
 * 验证邮箱
 * @param {email} arg
 * @returns {Boolean}
 */
export function isValidEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}
/**
 * @param {str} arg
 * @returns {Boolean}
 */
export function isValidIdCard(str) {
  const reg = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/
  return reg.test(str)
}
/**
 * @param {string} car code
 * @returns {Boolean}
 */
export function isCarCode(s) {
  const xreg =
    /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/
  const creg =
    /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/
  if (s.length === 7) {
    return creg.test(s)
  } else if (s.length === 8) {
    return xreg.test(s)
  } else {
    return false
  }
}
/**
 * @param {str} arg
 * @returns {Boolean}
 */
export function isValidCode(str) {
  const reg = /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/
  return reg.test(str)
}
/**
 * @param {str} arg
 * @returns {Boolean}
 */
export function isValidPassword(str) {
  const reg = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,20}/
  return reg.test(str)
}
/**
 * @param {str} arg
 * @returns {String}
 */
export function filterContent(str) {
  return str.replace(/<[^>]+>/g, '')
}
