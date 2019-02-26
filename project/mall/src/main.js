import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import i18n from './locales'
import axios from 'axios'
import vueLazyload from 'vue-lazyload'
import { currency } from '@/utils/currency.js'

Vue.prototype.$axios = axios;
// console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
	axios.defaults.baseURL = 'http://localhost:3000/';
}
axios.defaults.withCredentials = true; // 允许cookies

Vue.filter("currency", currency) // 全局过滤器，用于格式化价格
Vue.use(vueLazyload, {
    loading: require('./assets/loading/loading-bars.svg')
})

Vue.config.productionTip = false

new Vue({
    i18n,
    router,
    store,
    render: h => h(App)
}).$mount('#app')