<template>
  <section class="fullpage">
    <div class="items">
    	<h1>fulpage</h1>
    	<div :style="{ width: w + 'px', height: h + 'px',backgroundColor:'yellow'}"></div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'fullpage',
  data () {
    return {
      w: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
	    h: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
	  }
  },
  mounted() {
  	// 窗口变更获取窗口宽高
	window.onresize = function () {
	  
		}

	}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >


</style>
