<template>
  <div class="home">
    <Header />
    <HSlider />
    <Novice />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/header.vue'
import HSlider from './hSlider.vue'
import Novice from './novice.vue'

export default {
  name: 'home',
  components: {
    Header,
    HSlider,
    Novice
  }
}
</script>
