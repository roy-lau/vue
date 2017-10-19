// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import 'common/stylus/index.styl'
import VueLazyLoad from 'vue-lazyload'

fastclick.attach(document.body) // 解决移动端点击300毫秒延迟

Vue.use(VueLazyLoad, {
  loading: require('common/imgs/default.png') // 默认显示的图片
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store
  // store写在rander上边不能获取数据 cry
})
