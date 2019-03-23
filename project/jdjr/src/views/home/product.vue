<template>
  <Panel title="新品推荐" :class="$style.panel">
    <section :class="$style.content">
        <div class="arrow">更多尖货 &gt;</div>
      <Slider :options="options" :items="items" cname="product-slider"/>
    </section>
  </Panel>
</template>
 <script>
import Panel from "@/components/panel.vue";
import Slider from "@/components/slider.vue";
export default {
  components: {
    Panel,
    Slider
  },
  data() {
    return {
      items: [
        {
          href: "home" + Math.random(),
          src:
            "//img12.360buyimg.com/jrpmobile/jfs/t13963/267/2355123229/48850/254f797a/5a3c59aeN9cb550f6.jpg"
        },
        {
          href: "home" + Math.random(),
          src:
            "//img12.360buyimg.com/jrpmobile/jfs/t13021/306/1996997425/21953/bda69db3/5a2f6a17N9da099b1.jpg"
        },
        {
          href: "home" + Math.random(),
          src:
            "//img12.360buyimg.com/jrpmobile/jfs/t14125/310/1997192193/46667/3c910f8b/5a2f6a36Nad95b650.jpg"
        },
        {
          href: "home" + Math.random(),
          src:
            "//img12.360buyimg.com/jrpmobile/jfs/t15784/188/381232069/39444/8878571d/5a2f6a4aNbd5a574c.jpg"
        }
      ],
      options: {
        slidesPerView: 2.3, // 控制一屏显示几个
        spaceBetween: 30,
        freeMode: true
      }
    };
  }
};
</script>
 <style lang="scss" module>
@import "@/assets/css/element.scss";
.panel {
  @include panel;
  .content {
      position: relative;

    padding-bottom: 40px;
    &>div{
        position: absolute;
        right: 20px;
        top: -70px;
        font-size: 28px;
        color: #999;
    }
  }
}
</style>
 <style lang="scss">
.product-slider {
  .swiper-container {
    box-sizing: border-box;
    padding: 0 24px;
    .swiper-slide {
      a {
        display: inline-block;
        width: 100%;
        img {
          width: 100%;
          display: block;
          height: 314px;
          border: 1px solid #fafafa; 
        }
      }
    }
  }
}
</style>
 
 
 