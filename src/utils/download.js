export function onExport(res, name) {
  console.log('测试，接口返回数据', res)
  const disposition = res.headers['content-disposition']
  console.log(JSON.stringify(disposition))
  if (disposition.indexOf('filename=') < 0) { return }
  const fileName = decodeURI(disposition.substring(disposition.indexOf('filename=') + 9, disposition.length))
  const reg = /\.(pdf)$/
  const regDoc = /\.(doc)$/
  const regDocx = /\.(docx)$/
  var blob
  if (reg.test(fileName)) {
    blob = new Blob([res.data], { type: 'application/pdf' }) // 假设文件为excel
  } else if (regDoc.test(fileName)) {
    blob = new Blob([res.data], { type: 'application/msword' })
  } else if (regDocx.test(fileName)) {
    blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })
  } else {
    blob = new Blob([res.data], { type: 'application/vnd.ms-excel' }) // 假设文件为excel
  }
  if (window.navigator.msSaveBlob) {
    // ie
    try {
      window.navigator.msSaveBlob(blob, name)
    } catch (e) {
      console.error(e)
    }
  } else {
    const elink = document.createElement('a')
    elink.download = name
    elink.style.display = 'none'
    elink.href = window.URL.createObjectURL(blob)
    document.body.appendChild(elink)
    elink.click()
    document.body.removeChild(elink)
  }
}
