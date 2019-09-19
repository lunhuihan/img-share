import * as filter from './filter'
import http from '../apis'
import fixedInput from 'mixins/fixedInput'

function install (Vue) {
  Object.entries(filter).forEach(([key, value]) => {
    Vue.filter(key, value)
  })
  Vue.prototype.$Http = http
  Vue.directive('input', fixedInput)
}

export default { install }
