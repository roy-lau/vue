<template>
  <div class="home">
    <Header />
    <RSlider />
    <Daily />
    <Recommend />
    <More />

    <Footer  cname="m-footer" />
    <NavBar />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
import NavBar from '@/components/navbar.vue'
import RSlider from './rSlider.vue'
import Daily from './daily.vue'
import Recommend from './recommend.vue'
import More from './more.vue'


export default {
  name: 'home',
  components: {
    Header,
    Footer,
    NavBar,
    RSlider,
    Daily,
    Recommend,
    More
   
  }
}
</script>

<style lang="scss">
.m-footer{
  ul{
    li:first-child{
      display: none;
    }
  }
}
</style>