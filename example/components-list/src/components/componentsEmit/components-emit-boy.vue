
<!-- 这是一个子组件-boy -->

<template>
  <div id="components-emit-dad">
      <input type="button" @click="output" value="讲">
  </div>
</template>

<script>
export default {
  name: 'components-emit-dad',
  data () {
    return {
      boySpeak: "是的 dad，我是您儿子！"
	  }
  },
  methods: {
    output (){
      this.$emit("bad-event", this.boySpeak)   // $emit 的第一个参数是设置一个自定义事件，第二个参数是数据传给自定义事件
    }

	}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >


</style>
