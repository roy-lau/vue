import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home'
import shops from './views/shops'
import createOrder from './views/createOrder'
import userInfo from './views/createOrder/userInfo'
import payment from './views/payment'
import orderList from './views/orderList'

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
    },{
      path: '/user-info',
      name: 'userInfo',
      component:userInfo
    },{
      path: '/payment',
      name: 'payment',
      component:payment
    },{
      path: '/order-list',
      name: 'orderList',
      component:orderList
    }
  ]
})
