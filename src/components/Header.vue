<template>
  <header class="header">
    <h1>{{ title }}</h1>
      <label for="SwitchTheme" class="theme-box" @click="switchTheme" title="切换主题">
        <input type="checkbox" id="SwitchTheme" style="display:none;" v-model="activeTheme" placeholder="切换主题">
      </label>
    <NavBar />
  </header>
</template>

<script>
import NavBar from './NavBar'
export default {
  name: 'Header',
  components:{ NavBar },
  props: {
    title: String
  },
  data(){
    return {
      activeTheme: true
    }
  },
  mounted(){
    this.switchTheme()
  },
  methods:{
    switchTheme(){
       document.body.setAttribute('data-theme', this.activeTheme ? 'dark':'light')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/styles/theme/mixin.scss';

.header{
  text-align: center;
  // @include text_color('title');
  h1{
    margin: 0;
    background-image: linear-gradient(135deg,$color-primary,$color-success,$color-warning,$color-danger,$color-info);
  }
  .theme-box{
    width: 25px;
    height: 25px;
    position: absolute;
    top: 8px;
    right: 8px;
    @include bg_color('layout')
  }
}
</style>
