<template>
  <article>
    <Slider :items="items" :cname="$style.slider"/>
    <section :class="$style.list">
      <div :class="$style.item" v-for="item in enters" :key="item.img">
        <router-link :to="item.href">
          <img :src="item.img" :alt="item.href">
          <h4 v-text="item.title"></h4>
        </router-link>
      </div>
    </section>
  </article>
</template>
<script>
import Slider from "@/components/slider";
export default {
  components: {
    Slider
  },
  data() {
    return {
      items: [
        {
          href: "https://github.com/roy-lau?"+Math.random(),
          src: require("./imgs/hSlider-1.jpg")
        },
        {
          href: "https://github.com/roy-lau?"+Math.random(),
          src: require("./imgs/hSlider-2.jpg")
        },
        {
          href: "https://github.com/roy-lau?"+Math.random(),
          src: require("./imgs/hSlider-3.jpg")
        },
        {
          href: "https://github.com/roy-lau?"+Math.random(),
          src: require("./imgs/hSlider-4.jpg")
        }
      ],
      enters: [
        {
          href: "download",
          title: "优惠券",
          img: require("./imgs/hSlider-enters-1.png")
        },
        {
          href: "https://github.com/roy-lau?"+Math.random(),
          title: "领福利",
          img: require("./imgs/hSlider-enters-2.png")
        },
        {
          href: "https://github.com/roy-lau?"+Math.random(),
          title: "抢锅蹦",
          img: require("./imgs/hSlider-enters-3.png")
        },
        {
          href: "https://github.com/roy-lau?"+Math.random(),
          title: "白条提额",
          img: require("./imgs/hSlider-enters-4.png")
        },
        {
          href: "https://github.com/roy-lau?"+Math.random(),
          title: "工资理财",
          img: require("./imgs/hSlider-enters-5.png")
        },
        {
          href: "https://github.com/roy-lau?"+Math.random(),
          title: "众筹",
          img: require("./imgs/hSlider-enters-6.png")
        },
        {
          href: "https://github.com/roy-lau?"+Math.random(),
          title: "租房",
          img: require("./imgs/hSlider-enters-7.png")
        },
        {
          href: "https://github.com/roy-lau?"+Math.random(),
          title: "车主服务",
          img: require("./imgs/hSlider-enters-8.png")
        }
      ]
    };
  }
};
</script>
<style lang="scss" module>
@import "@/assets/css/element.scss";
.slider {
  margin-top: 120px;
  img{
    width: 100%;
  }
}
.list {
  @include list(row);
  background-color: white;
  padding-bottom: 20px;
  justify-content: space-around;
  a {
    text-decoration: none;
  }
  .item {
    text-align: center;
    width: 25%;
    padding: 20px 0;
    img {
      display: inline-block;
      width: 90px;
      height: 90px;
    }
    h4 {
      font-size: 26px;
      margin-top: 12px;
      color: #666;
    }
  }
}
</style>

