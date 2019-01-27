import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import axios from 'axios'
import vueLazyload from 'vue-lazyload'

Vue.prototype.$axios = axios;
axios.defaults.baseURL = 'http://localhost:3000/';
axios.defaults.withCredentials = true;
Vue.use(vueLazyload,{
	loading: require('./assets/loading/loading-bars.svg')
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
