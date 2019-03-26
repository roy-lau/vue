<template>
  <div class="home">
    <Header />
    <MSlider />
    <AdBox title="神劵满" height="230px" img="./imgs/ads-1.png"/>
    <Money />
    <AdBox title="理财专享" height="142px" img="./imgs/ads-2.png"/>
    <Finance />
    <AdBox title="惊动智投" height="102px" img="./imgs/ads-3.jpg"/>
    <Footer cname="m-footer"/>
    <NavBar />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
import NavBar from '@/components/navbar.vue'
import MSlider from './mSlider.vue'
import Money from './money.vue'
import AdBox from './adBox.vue'
import Finance from './finance.vue'

export default {
  name: 'home',
  components: {
    Header,
    Footer,
    NavBar,
    MSlider,
    Money,
    AdBox,
    Finance
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

