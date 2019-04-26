// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "@babel/polyfill"
import Vue from 'vue'
import App from './App'
import router from './router.js'
import store from './store'
// import 'lib-flexible'

import { AjaxPlugin ,WechatPlugin } from 'vux'

const FastClick = require('fastclick')
FastClick.attach(document.body)

Vue.use(AjaxPlugin) // $http
Vue.use(WechatPlugin) // $wechat

Vue.prototype.$http.defaults.baseURL = process.env.API
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
