import Vue from 'vue'
import Router from 'vue-router'
import goodsList from './views/goods-list'

Vue.use(Router)

export default new Router({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'goodsList',
            component: goodsList
        },
        {
            path: '/cart',
            name: 'cart',
            component: () => import( /* webpackChunkName: "cart" */ './views/cart')
        },
        {
            path: '/admin',
            name: 'admin',
            component: () => import( /* webpackChunkName: "cart" */ './views/admin/goods')
        },
        {
            path: '/address',
            name: 'address',
            component: () => import( /* webpackChunkName: "cart" */ './views/address')
        },
        {
            path: '/orderConfirm',
            name: 'orderConfirm',
            component: () => import( /* webpackChunkName: "cart" */ './views/orderConfirm')
        },
        {
            path: '/orderSuccess',
            name: 'orderSuccess',
            component: () => import( /* webpackChunkName: "cart" */ './views/orderSuccess')
        }
    ]
})