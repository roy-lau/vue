import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/theme-button',
    name: 'themeButton',
    component: () => import(/* webpackChunkName: "themeButton" */ '../views/themeButton.vue')
  },
  {
    path: '/theme-from',
    name: 'themeFrom',
    component: () => import(/* webpackChunkName: "themeFrom" */ '../views/themeFrom.vue')
  },
  {
    path: '/theme-table',
    name: 'themeTable',
    component: () => import(/* webpackChunkName: "themeTable" */ '../views/themeTable.vue')
  },
  {
    path: '/theme-list',
    name: 'themeList',
    component: () => import(/* webpackChunkName: "themeList" */ '../views/themeList.vue')
  },
  {
    path: '/theme-card',
    name: 'themeCard',
    component: () => import(/* webpackChunkName: "themeCard" */ '../views/themeCard.vue')
  },
  {
    path: '/theme-tag',
    name: 'themeTag',
    component: () => import(/* webpackChunkName: "themeTag" */ '../views/themeTag.vue')
  },
] 
const router = new VueRouter({
  routes
})

export default router
