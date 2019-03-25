import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/money',
      name: '理财',
      // route level code-splitting
      // this generates a separate chunk (money.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "money" */ './views/money')
    },{
      path: '/ious',
      name: '白条',
      component: () => import(/* webpackChunkName: "ious" */ './views/ious')
    },{
      path: '/raise',
      name: '众筹',
      component: () => import(/* webpackChunkName: "raise" */ './views/raise')
    },{
      path: '/download',
      name: '下载',
      component: () => import(/* webpackChunkName: "raise" */ './views/special/download')
    },
  ]
})
