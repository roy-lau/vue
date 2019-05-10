import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Routes = new Router({
    routes: [{
            path: '/',
            name: 'login',
            component: () => import( /* webpackChunkName: "sys-appUpgrade" */ '@/views/login'),

        }
    ]
})

// 动态添加路由
Routes.addRoutes([{
    path: '/ser',
    name: 'ser',
    component: () => import('@/views/serIndex'),
    redirect: '/ser/dashboard',
    children: [{
        path: 'dashboard',
        name: 'server首页',
        component: () => import('@/views/dashboard'),
    },{
        path: 'system-create-table',
        name: 'system-create',
        component: () => import('@/views/system/create'),
    },{
        path: 'system-update-table',
        name: 'system-update',
        component: () => import('@/views/system/update'),
    },{
        path: 'system-update-row',
        name: 'system-update-row',
        component: () => import('@/views/system/updateRow'),
    },{
        path: 'tables',
        name: 'tables',
        component: () => import('@/views/tables'),
    }],
}, {
    path: '*',
    redirect: '/errPage',
}])

export default Routes;