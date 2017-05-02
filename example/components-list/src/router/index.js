import Vue from 'vue'
import Router from 'vue-router'
import homeList from '@/components/homeList'
import fullpage from '@/components/fullpage'
import todoList from '@/components/todoList'
import componentsEmitDad from '@/components/componentsEmit/components-emit-dad'

// const apidoc = r => require.ensure([], () => r(require('@/components/apilist/apidoc')), 'api')

Vue.use(Router)

export default new Router({
    mode: 'history', // 加入这个就可以去掉hash(#)了
    routes: [{
            path: '/',
            name: 'homeList',
            component: homeList,
        },{
            path: '/fullpage',
            name: 'fullpage',
            component: fullpage,
        },{
            path: '/todoList',
            name: 'todoList',
            component: todoList,
        },{
            path: '/componentsEmitDad',
            name: 'componentsEmitDad',
            component: componentsEmitDad,
        }
        // children: []
    ]
})
