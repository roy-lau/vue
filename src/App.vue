<template>
  <div id="app">
    <Header title="scss 主题"/>
    <router-view/>
  </div>
</template>
<script>
// @ is an alias to /src
import Header from '@/components/Header'
export default {
  name: 'app',
  components:{ Header },
}
</script>
<style lang="scss">
@import '@/styles/theme/mixin.scss';

html,body{
  margin: 0;
  @include scrollbar;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  @include bg_color('layout');
  @include box_shadow('card');

}
</style>
