import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import 'element-ui/lib/theme-chalk/index.css'

const instance = axios.create({
    baseURL: 'http://localhost:3005/api/',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});

Vue.prototype.$axios = instance
Vue.use(ElementUI, { size: 'small', zIndex: 800 })
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')