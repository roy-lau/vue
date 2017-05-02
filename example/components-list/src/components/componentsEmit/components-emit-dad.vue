
<!-- 这是一个父组件-dad -->

<template>
  <div id="components-emit-dad">
      <h1>父组件向子组件传递参数应用实例</h1>
      
      <components-emit-boy @bad-event="input"></components-emit-boy>   <!-- 使用子组件 -->
  </div>
</template>

<script>
import componentsEmitBoy from './components-emit-boy'   // 将子组件导入父组件
export default {
  name: 'components-emit-dad',
  components: {
    componentsEmitBoy // 定义子组件
  },
  data () {
    return {
        dadSpeak: "你是我的boy吗？"
	  }
  },
  methods: {       // methods后面必须是:冒号，如果错误的写成()会报错提示methods里面的func不是一个方法
	     input (boySpeak) {	// 这里的boySpeak是通过子组件里的$emit方法传递过来的，
	     	console.log(this.dadSpeak,boySpeak) // 正常情况应该输出（你是我的boy吗？是的 dad，我是您儿子！)
	     }
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >


</style>
