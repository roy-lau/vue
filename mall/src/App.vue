<template>
  <div id="app">
    <headers />
    <router-view/>
    <footers />
  </div>
</template>
<script>
import '@/assets/css/base.css'
import '@/assets/css/checkout.css'

import headers from '@/components/header.vue'
import footers from '@/components/footer.vue'

export default {
    name: 'app',
    components: {
        headers,
        footers
    }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
