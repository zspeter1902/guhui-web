import store from '@/store'

function checkPermission(el, binding) {
  const { value } = binding
  // 仓储企业/海外仓 4
  const companyType = store.getters && store.getters.companyType
  if (value) {
    if (companyType === '4') {
      if (value.includes('产品')) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      if (value.includes('海外仓')) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  } else {
    throw new Error(``)
  }
}

export default {
  inserted(el, binding) {
    checkPermission(el, binding)
  },
  update(el, binding) {
    checkPermission(el, binding)
  }
}
