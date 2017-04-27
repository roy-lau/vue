<template>
  <div id="app">
    <img src="./assets/logo.png">
    <fullpage></fullpage>
  </div>
</template>

<script>
import fullpage from './components/fullpage'

export default {
  name: 'app',
  components: {
    fullpage
  }
}
</script>

<style>
html,body{width: 100%;margin:0;}
#app {
  text-align: center;
  width: 100%;
  }
</style>
