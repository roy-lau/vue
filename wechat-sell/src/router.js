import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home'
import shops from './views/shops'
import payment from './views/payment'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },{
      path: '/shops',
      name: 'shops',
      component:shops
    },{
      path: '/payment',
      name: 'payment',
      component:payment
    }
  ]
})
