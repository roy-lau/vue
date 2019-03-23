<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
// reset css
body {
  margin: 0;
  background-color: #f5f5f5;
}
ul,
ol,dd,p,h1,h2,h3,h4,h5 {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
</style>
