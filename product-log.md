1、如果想让div铺满整个屏幕，需要把当前元素及其所以的父元素(包括html和body)的height设为100%

2、vue的声明周期函数

	   beforeCreate(){
	      alert('beforeCreate' + '1')
	   },
	    created(){
	      alert('created' + '2')
	   },
	    beforeMount(){
	      alert('beforeMount' + '3')
	   },
	    mounted(){
	      alert('mounted' + '4')
	   },
	    beforeUpdate(){
	      alert('beforeUpdate' + '5')
	   },
	    updated(){
	      alert('updated' + '6')
	   },
	    beforeDestroy(){
	      alert('beforeDestroy' + '7')
	   },
	    destroyed(){
	      alert('destroyed' + '8')
	   },
	    activated(){
	      alert('activated' + '9')
	   },
	    deactivated(){
	      alert('deactivated' + '10')
	   }
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
    
__对于这些在 ``enter/leave`` 过渡中切换的类名，``v-`` 是这些类名的前缀。使用``<transition name="my-transition">``可以重置前缀，比如 ``v-enter`` 替换为 ``my-transition-enter``。

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
