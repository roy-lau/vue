<template>
  <div class="home">
    <Header />
    <MSlider />
    <AdBox title="神劵满" height="230px" img="//img12.360buyimg.com/jrpmobile/jfs/t5842/235/8356236245/38364/2112fd7e/597a95d4Ne01da140.png"/>
    <Money />
    <AdBox title="理财专享" height="142px" img="//img12.360buyimg.com/jrpmobile/jfs/t10876/23/2566835181/40527/d7d27c08/59f97d68Ne53fda5b.png"/>
    <Finance />
    <AdBox title="惊动智投" height="102px" img="//img12.360buyimg.com/jrpmobile/jfs/t7162/219/4755741/18941/4e51a5aa/597b066dNf6c7a972.jpg"/>
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

