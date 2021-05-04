<template>
    <nav id="nav">
      <img class="logo" alt="Vue logo" src="../assets/logo.png">
      <router-link to="/">首页</router-link>
      <router-link to="/theme-button">按钮</router-link>
      <router-link to="/theme-from">表单</router-link>
      <router-link to="/theme-table">表格</router-link>
      <router-link to="/theme-list">列表</router-link>
      <router-link to="/theme-card">卡片</router-link>
      <router-link to="/theme-tag">标签</router-link>
      <router-link to="/about">关于</router-link>
    </nav>
</template>

<style lang="scss">
@import '@/styles/theme/mixin.scss';

#nav {
  display: flex;
  align-items: center;
  height: 60px;
  .logo{
    width: 30px;
    height: 30px;
    margin: 0 20px;
  }
  a {
    font-weight: bold;
    flex: 1;
    text-align: center;
    @include text_color('default');
    text-decoration-line: none;
    &.router-link-exact-active {
      @include text_color('title');
      text-decoration-line: underline;
    }
  }
}
</style>
