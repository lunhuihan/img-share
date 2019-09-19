import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import myPlugin from './utils/plugin'
import Vant from 'vant'
import 'vant/lib/index.css'
import './assets/scss/common.scss'
import 'lib-flexible'
import VueQrcode from '@chenfengyuan/vue-qrcode'
Vue.config.productionTip = false

Vue.use(Vant);
Vue.use(myPlugin)
Vue.component(VueQrcode.name, VueQrcode)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})