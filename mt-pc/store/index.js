import Vue from 'vue'
import Vuex from 'vuex'
import geo from './modules/geo'
import home from './modules/home'


Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: { geo, home },
  actions: {
    async nuxtServerInit({ commit }, { req, app }) {
      // 获取当前所在的城市
      let { status, data: position } = await app.$axios.get('/geo/getPosition')
      if (status === 200 && position && position.code === 0) {
        const data = position.data
        commit('geo/setPosition', data)
      }
      // 获取菜单
      let { status: status1, data: menu } = await app.$axios.get('/geo/menu')
      if (status1 === 200 && menu && menu.code === 0) {
        const data = menu.data
        commit('home/setMenu', data)
      }
    }
  }
})

export default store
