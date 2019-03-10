<template>
  <section class="slide">
    <swiper :options="options" not-next-tick="options.notNextTick">
      <swiper-slide v-for="item in items" :key="item.href">
          <router-link :to="item.href">
              <img :    src="item.src" alt="">
          </router-link>
      </swiper-slide>
      <div class="swiper-pagination" v-if="options.pagination"/>
    </swiper>
  </section>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  components: {
    swiper,
    swiperSlide
  },
  props: {
    options: {
      type: Object,
      default: () => {
          return{
              pagination:{
                  el:".swiper-pagination"
              },
              autoplay: true,
              loop:true,
              notNextTick: false,
          }
      }
    },
    items:{
        type:Array,
        default:()=>[]
    }
  }
};
</script>
<style>
@import "~swiper/dist/css/swiper.css";
</style>


