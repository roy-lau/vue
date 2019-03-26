<template>
  <Panel title="金融头条" :class="$style.panel">
    <section :class="$style.content">
      <swiper :options="options" >
        <swiper-slide>百万白条券免费送，速来领取！！ <em>></em> </swiper-slide>
        <swiper-slide>签到领流量，1元500M！<em>></em> </swiper-slide>
        <swiper-slide>支付宝基金狂赚一百万！！<em>></em> </swiper-slide>
        <swiper-slide>支付宝在未来或会对接白条！！<em>></em> </swiper-slide>
      </swiper>
    </section>
  </Panel>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import Panel from "@/components/panel.vue";
export default {
  components: {
    Panel,
    swiper,
    swiperSlide
  },
  data(){
      return{
          options:{
              autoplay:true,
              loop:true,
              direction:"vertical"
          }
      }
  }
};
</script>
<style lang="scss" module>
@import "~swiper/dist/css/swiper.css";
@import "@/assets/css/element.scss";
.panel {
  margin-top: 120px !important;
  @include panel;
  > h4 {
    display: none;
  }
  .content {
      height: 72px;
      line-height: 72px;
      overflow: hidden;
      padding-left: 166px;
      background: url(./imgs/title_img.png) left top no-repeat;
  }
}
</style>
<style lang="scss">
.swiper-container-vertical{
    height: 72px;
    .swiper-slide{
        font-family:"";
        font-size: 28px;
        color: #333;
        em{
            color:#ddd;
            float: right;
            margin-right: 20px;
        }
    }
}
</style>


