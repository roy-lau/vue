import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger(),createPersistedState({ storage: window.sessionStorage })] : [createPersistedState({ storage: window.sessionStorage })]
})




// const store = new Store({
//   // ...
//   plugins: [
//     createPersistedState({
//       storage: {
//         getItem: key => Cookies.get(key),
//         setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true }),
//         removeItem: key => Cookies.remove(key)
//       }
//     })
//   ]
// })