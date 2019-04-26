import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home'
import shops from './views/shops'
import createOrder from './views/createOrder'

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
      path: '/create-order',
      name: 'createOrder',
      component:createOrder
    }
  ]
})
