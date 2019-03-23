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
          src:
            "//img12.360buyimg.com/jrpmobile/jfs/t13744/11/2508939408/43213/58bfe502/5a421ff3N52d0a474.jpg"
        },
        {
          href: "https://github.com/roy-lau?"+Math.random(),
          src:
            "//img12.360buyimg.com/jrpmobile/jfs/t16138/325/817844900/36681/5d874455/5a422029Ncd678ea3.jpg",
        },
        {
          href: "https://github.com/roy-lau?"+Math.random(),
          src:
            "//img12.360buyimg.com/jrpmobile/jfs/t1/19037/8/10380/37518/5c862ba2Ec8e629f7/6c4f8c721cf210d8.jpg"
        },
        {
          href: "https://github.com/roy-lau?"+Math.random(),
          src:
            "//img12.360buyimg.com/jrpmobile/jfs/t1/28576/40/10399/139307/5c862bc6E022a873e/c50fcefa58db30ce.jpg"
        }
      ],
      enters: [
        {
          href: "https://github.com/roy-lau?"+Math.random(),
          title: "优惠券",
          img:
            "//img12.360buyimg.com/jrpmobile/jfs/t3991/64/2521945388/12110/93c0139/58d1e462Ncf294123.png"
        },
        {
          href: "https://github.com/roy-lau?"+Math.random(),
          title: "领福利",
          img:
            "//img12.360buyimg.com/jrpmobile/jfs/t5590/252/875247023/17343/946aa72c/59224650N0f7ffc92.png"
        },
        {
          href: "https://github.com/roy-lau?"+Math.random(),
          title: "抢锅蹦",
          img:
            "//img12.360buyimg.com/jrpmobile/jfs/t4393/329/2180608902/13217/c88c0cec/58ec9dcdN1534e2d7.png"
        },
        {
          href: "https://github.com/roy-lau?"+Math.random(),
          title: "白条提额",
          img:
            "//img12.360buyimg.com/jrpmobile/jfs/t5488/298/1036263348/12073/b4f4de97/590ac8e8Ne9def22e.png"
        },
        {
          href: "https://github.com/roy-lau?"+Math.random(),
          title: "工资理财",
          img:
            "//img12.360buyimg.com/jrpmobile/jfs/t1/520/34/950/3686/5b9239e3Eaaf5465c/8d8c35badacfc114.png"
        },
        {
          href: "https://github.com/roy-lau?"+Math.random(),
          title: "众筹",
          img:
            "//img12.360buyimg.com/jrpmobile/jfs/t1/1216/39/659/4516/5b923b1cE5943d1c6/dabaf8b842f57eb9.png"
        },
        {
          href: "https://github.com/roy-lau?"+Math.random(),
          title: "租房",
          img:
            "//img12.360buyimg.com/jrpmobile/jfs/t1/3924/28/657/3552/5b9240dbE60256c31/78b52d5ab675f800.png"
        },
        {
          href: "https://github.com/roy-lau?"+Math.random(),
          title: "车主服务",
          img:
            "//img12.360buyimg.com/jrpmobile/jfs/t27088/243/2089650291/12365/2469f395/5bf677f9N795eec5e.png"
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

