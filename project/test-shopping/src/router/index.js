import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/pages/index'
import DetailPage from '@/pages/detail'
import DetailAnaPage from '@/pages/detail/analysis'
import DetailCouPage from '@/pages/detail/count'
import DetailForPage from '@/pages/detail/forecast'
import DetailPubPage from '@/pages/detail/publish'
import orderList from '@/pages/orderList'

Vue.use(Router)

export default new Router({
    mode: 'history', // 加入这个就可以去掉hash(#)了
    routes: [{				// 坑-- （router !== routes）
            path: '/web_list/vuejs-shopping',
            component: IndexPage   // 坑-- （componentes !== component）
        	},{
            path: '/web_list/vuejs-shopping/orderList',
            component: orderList
        	},{
			path: '/web_list/vuejs-shopping/detail',
			component: DetailPage,
			redirect: '/web_list/vuejs-shopping/detail/analysis',   // 直接访问detail的时，跳到/detail/analysis页面
			children: [
				{
					path: 'analysis',
					component: DetailAnaPage
				},
				{
					path: 'count',
					component: DetailCouPage
				},
				{
					path: 'forecast',
					component: DetailForPage
				},
				{
					path: 'publish',
					component: DetailPubPage
				}
			]
		}]

})
