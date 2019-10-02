<template>
  <div class="home">
    <Header />
    <ISlider />
    <Welfare />
    <Service />
    <Footer/>
    <NavBar />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
import NavBar from '@/components/navbar.vue'
import ISlider from './iSlider.vue'
import Service from './service.vue'
import Welfare from './welfare.vue'

export default {
  name: 'home',
  components: {
    Header,
    Footer,
    NavBar,
    ISlider,
    Service,
    Welfare
  }
}
</script>


