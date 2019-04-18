
## vuex 核心概念

### State

> 数据源，单一的状态树

```js
const Counter = {
  template:`<div>{{ count }}</div>`,
  computed:{
    count(){
      return this.$store.state.count
    }
  }
}
```

### Getters

> 通过Getters可以派生一些新的事件

```js
const store = new Vuex.Store({
  state:{
    todos:[
    {id:1,text:"......",done:true},
    {id:2,text:"......",done:false,
    ]
  },
  getters:{
    doneTodos: state =>{
      return state.todos.filter(todo =>{todo.done})
    }
  }
})
```

### Mutations

> 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation

```js
const store = new Vuex.Store({
  state:{
    count:1
  },
  mutations:{
    increment(state){
      // 变更状态
      state.count++
    }
  }
})
// 触发(调用)函数
store.commit("increment")
```
### Actions:

> Action 提交的是 mutation，而不是直接改变状态。Action 可以包含任意异步操作

```js
const store  = new Vuex.Store({
  state:{
    const: 0
  },
  // mutations 是同步的
  mutations:{
    increment(state){
      // 变更状态
      state.count++
    }
  },
  // actions 是异步操作
  actions:{
    increment(context){
      context.commit("increment")
    }
  }
})
```

### Modules

> 面对复杂的应用程序，当状态管理比较多时，需要将 Vuex的store对象分隔成模块（Modules）

```js
const moduleA ={
  state:{},
  mutations:{},
  actions:{},
  getters:{}
}
const moduleB ={
  state:{},
  mutations:{},
  actions:{},
  getters:{}
}
const store = new Vuex.Store({
  modules:{
    a: moduleA,
    b: moduleB
  }
})
```
<img src="https://vuex.vuejs.org/vuex.png" alt="Vuex状态管理图">

## vue

1、指令

    v-text        // 文本，字符串
    v-html        // 标签，文本字符串
    v-show        // 控制显示/隐藏 dom（Boolean）
    v-if        // 控制删除/显示 dom（Boolean）
    v-else        // 当v-if的条件不满足的时候显示v-else的
    v-else-if    // 2.1.0新增 （Boolean）
    v-for
    v-on
    v-bind
    v-model
    v-pre
    v-cloak
    v-once

2、事件简写

    v-bind:  === ：
    v-on:    ===  @

3、vue事件

    @mouseover 	// 鼠标移入
    @mouseout 	// 鼠标移出

4、过渡状态

  会有 4 个(CSS)类名在 enter/leave 的过渡中切换：

  1. v-enter: 定义进入过渡的开始状态。在元素被插入时生效，在下一个帧移除。
  2. v-enter-active: 定义进入过渡的结束状态。在元素被插入时生效，在 transition/animation 完成之后移除。
  3. v-leave: 定义离开过渡的开始状态。在离开过渡被触发时生效，在下一个帧移除。
  4. v-leave-active: 定义离开过渡的结束状态。在离开过渡被触发时生效，在 transition/animation 完成之后移除。
  Transition Diagram

__对于这些在  `enter/leave`  过渡中切换的类名，`v-` 是这些类名的前缀。使用 `<transition name="my-transition">` 可以重置前缀，比如 `v-enter` 替换为 `my-transition-enter` 。__

5、父子组件通信

组件需要的一切都是通过上下文传递，包括：

    props: 提供 props 的对象
    children: VNode 子节点的数组
    slots: slots 对象
    data: 传递给组件的 data 对象
    parent: 对父组件的引用

* 缓存组件
```js
  keep-alive // 把切换出去的组件保留在内存中，可以保留它的状态或避免重新渲染
```

6、路由

    1. mode: 'history',    // 加入这个就可以去掉hash(#)了
    2. active-class       // 鼠标点击后给元素添加的样式

7、vue的生命周期函数

```js
    // 在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用。
    beforeCreate () {
      console.log('实例初始化...')
    },
    // 实例已经创建完成之后被调用
    created () {
      console.log('实例已经创建完成...')
    },
    // 在挂载开始之前被调用：相关的 render 函数首次被调用。
    beforeMount () {
      console.log('即将挂载...')
    },
    // el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子
    mounted () {
      console.log('已挂载到实例...')
    },
    // 数据更新时调用
    beforeUpdate () {
      console.log('数据更新中...')
    },
    // 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
    updated () {
      console.log('数据更改导致的虚拟 DOM 重新渲染...')
    },
    // 实例销毁之前调用。在这一步，实例仍然完全可用。
    beforeDestroy () {
      console.log('实例马上销毁...')
    },
    // Vue 实例销毁后调用
    destroyed () {
      console.log('实例已销毁...')
    }
```

> vue的生命周期图

<img src="https://cn.vuejs.org/images/lifecycle.png" alt="vue生命周期图">

