
import Vue from 'vue'
import router from './router'
// import App from './App'
import Layout from './components/layout'


Vue.config.productionTip = false	//将此值设置为 false ,会关闭 Vue 启动时的提示信息，推荐

/* eslint-disable no-new */		// 这行注释的意思是，new出来的Vue可以不赋值给变量
new Vue({
  el: '#app',
  router,
  template: '<Layout/>',
  components: { Layout }
})