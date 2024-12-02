/**
 * 解析代码里的[]替换为a标签
 * @param {String} text
 * @returns {String}
 */
export function HTMLEncode(html) {
  let temp = document.createElement('div')
  temp.textContent != null ? (temp.textContent = html) : (temp.innerText = html)
  const output = temp.innerHTML
  temp = null
  return output
}
export function replaceLink(text) {
  const reg = new RegExp(/\[(.+)(\s*)\]/, 'gi')
  const strHtml = text.replaceAll(reg, (val) => {
    return `<a src="javascript:;" class="link-search" data-value="${val}">${val}</a>`
  })
  return strHtml
}
export function replaceVideo(video) {
  // const reg = new RegExp(/\[(.+)(\s*)\]/, 'gi')
}
