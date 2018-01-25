1、指令


2、vue的生命周期函数
=======
	v-text		// 文本，字符串
	v-html		// 标签，文本字符串
	v-show		// 控制显示/隐藏 dom（Boolean）
	v-if		// 控制删除/显示 dom（Boolean）
	v-else		// 当v-if的条件不满足的时候显示v-else的
	v-else-if	// 2.1.0新增 （Boolean）
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
    
__对于这些在 ``enter/leave`` 过渡中切换的类名，``v-`` 是这些类名的前缀。使用``<transition name="my-transition">``可以重置前缀，比如 ``v-enter`` 替换为 ``my-transition-enter``。__

  5、父子组件通信
  组件需要的一切都是通过上下文传递，包括：
  
	    props: 提供 props 的对象
	    children: VNode 子节点的数组
	    slots: slots 对象
	    data: 传递给组件的 data 对象
	    parent: 对父组件的引用
  缓存组件

		keep-alive
  把切换出去的组件保留在内存中，可以保留它的状态或避免重新渲染

 6、路由
  
	    1. mode: 'history',    // 加入这个就可以去掉hash(#)了
	    2. active-class       // 鼠标点击后给元素添加的样式
 
 7、vue的生命周期函数
 
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

  3、vue事件
  	@ 表事件
		  @mouseover 	// 鼠标移入
		  @mouseout 	// 鼠标移出

  4、过渡状态
  会有 4 个(CSS)类名在 enter/leave 的过渡中切换：

    1. v-enter: 定义进入过渡的开始状态。在元素被插入时生效，在下一个帧移除。
    2. v-enter-active: 定义进入过渡的结束状态。在元素被插入时生效，在 transition/animation 完成之后移除。
    3. v-leave: 定义离开过渡的开始状态。在离开过渡被触发时生效，在下一个帧移除。
    4. v-leave-active: 定义离开过渡的结束状态。在离开过渡被触发时生效，在 transition/animation 完成之后移除。
    Transition Diagram
    
__对于这些在 ``enter/leave`` 过渡中切换的类名，``v-`` 是这些类名的前缀。使用``<transition name="my-transition">``可以重置前缀，比如 ``v-enter`` 替换为 ``my-transition-enter``。__

  5、父子组件通信
  组件需要的一切都是通过上下文传递，包括：
  
	    props: 提供 props 的对象
	    children: VNode 子节点的数组
	    slots: slots 对象
	    data: 传递给组件的 data 对象
	    parent: 对父组件的引用

  6、路由
  
	    1. mode: 'history',    // 加入这个就可以去掉hash(#)了
	    2. active-class       // 鼠标点击后给元素添加的样式

	vue的生命周期图
	
  <img src="https://cn.vuejs.org/images/lifecycle.png">

