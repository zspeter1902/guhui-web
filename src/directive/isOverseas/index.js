import isOverseas from './isOverseas'

const install = function(Vue) {
  Vue.directive('isOverseas', isOverseas)
}

if (window.Vue) {
  window.isOverseas = isOverseas
  Vue.use(install); // eslint-disable-line
}

isOverseas.install = install
export default isOverseas
