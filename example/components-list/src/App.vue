<template>
  <div id="app">
    <router-view>
        <home-list></home-list>
    </router-view>
  </div>
</template>

<script>
import homeList from './components/homeList'

export default {
  name: 'app',
  components: {
    homeList
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
