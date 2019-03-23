<template>
  <div class="home">
    <Header />
    <HSlider />
    <Novice />
    <Borrow />
    <Money />
    <Product />
    <Life />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
import HSlider from './hSlider.vue'
import Novice from './novice.vue'
import Borrow from './borrow.vue'
import Money from './money.vue'
import Product from './product.vue'
import Life from './life.vue'

export default {
  name: 'home',
  components: {
    Header,
    Footer,
    HSlider,
    Novice,
    Borrow,
    Money,
    Product,
    Life
  }
}
</script>
