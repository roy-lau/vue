

## vuex 最佳实践(_I think_)

[vuex 官方文档](https://vuex.vuejs.org/zh/)

### 目录结构

首先，在 vue 项目的 `src` 目录下 创建 `store` 文件夹。然后创建如下 6 个文件：

* `index.js`
* `state.js`
* `mutations.js` 
* `mutation-types.js`
* `actions.js`
* `getters.js`


#### index.js

```js
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
// vuex 日志插件
import createLogger from 'vuex/dist/logger'
// vuex 持久化插件，可以将 vuex 的数据存入缓存中
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const plugins = [createPersistedState({ storage: window.sessionStorage })]
debug && plugins.push(createLogger())

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: plugins
})

```

#### state.js

```js
const state = {
    token: '',
}

export default state
```


#### mutation-types.js

```js
/*
 * set token
 */
export const SET_TOKEN = 'SET_TOKEN'
```

#### mutations.js 

```js
import * as types from './mutation-types'

// mutation 是同步函数
const matutaions = {
    [types.SET_TOKEN](state, token) { state.token = token }
}

export default matutaions
```

#### actions.js

```js
// actions 方便做异步操作
import * as types from './mutation-types'

export const login = ({ commit, state }, data) =>{
    axios.post('login',data).then(res=>{
        commit('SET_TOKEN',res.token)
    }).catch(console.error)
}
```


#### getters.js

```js
// 这个文件相当于计算属性

/*
 * get token
 */
export const token = state => state.token
```

#### mapGetters 调用

```js
import { mapGetters } from 'vuex'

new Vue(
    computed: {
        ...mapGetters(['token']), //相当于计算属性，可以直接 this.token 调用
    },
)
```

#### mutations 调用

```js
import { mapMutations } from 'vuex'

new Vue(
    methods: {
        ...mapMutations({ setToken: 'SET_TOKEN' })
        // 退出登陆函数
        logout(){
            // ...

            // 方法1
            this.setToken(null)
        }
    }
)
```

#### actions 调用

```js
import { mapActions } from 'vuex'

new Vue(
    methods: {
        // 登陆函数
        ...mapActions(['login'])
    }
)
```


> vue的生命周期图

<img src="https://cn.vuejs.org/images/lifecycle.png" alt="vue生命周期图">

