<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  methods: {},
  beforeCreate() {}
}

</script>
<style lang="less">
@import '~vux/src/styles/reset.less';
@import './assets/less/icons.less';

i {
  font-style: normal;
}

li {
  list-style: none;
}

</style>
