<template>
  <div id="homeList">
    <!-- <img src="../assets/logo.png"> -->
    <ol>
      <li><router-link to="fullpage">全屏滚动(fullpage)</router-link></li>
      <li><router-link to="todoList"> todoList </router-link></li>
    	<li><router-link to="componentsEmitDad">父子组件传参</router-link></li>
    </ol>
  </div>
</template>

<script>
// import fullpage from './fullpage'

export default {
  name: 'homeList',
/*  components: {
    fullpage
  }*/
}
</script>

<style>

</style>
