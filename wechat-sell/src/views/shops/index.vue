<template>
  <div>
    <!-- 头部 start -->
    <v-header :seller="seller"></v-header>
    <!-- 头部 end -->
    <!-- 导航条 start -->
    <div>
      <tab :line-width="2" active-color="#ed1b23" v-model="navBarIdx">
        <tab-item
          class="vux-center tab-item-cls"
          :selected="navBarTed === item"
          v-for="(item, index) in navBar"
          @on-item-click="onItemClick(index)"
          :key="index"
        >{{item}}</tab-item>
      </tab>
      <swiper :show-dots="false" height="20.3rem" v-model="navBarIdx">
         <swiper-item>
          <goods class="tab-swiper vux-center" :seller="seller" />
        </swiper-item>
        <swiper-item>
          <Ratings class="tab-swiper vux-center" :seller="seller" />
        </swiper-item>
         <swiper-item>
          <Seller class="tab-swiper vux-center" :seller="seller" />
        </swiper-item>
      </swiper>
    </div>
    <!-- 导航条 end -->
  </div>
</template>

<script>
import { Tab, TabItem, Swiper, SwiperItem } from "vux";
import { urlParse } from "@/assets/js/util";
import header from "./header";
import Ratings from "@/components/ratings";
import Seller from "@/components/seller";
import Goods from "./goods.vue";
const ERR_OK = 0;

export default {
  data() {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse();
          return queryParam.id;
        })()
      },
      //   navBar
      navBar: ["商品", "评论", "商家"],
      navBarTed: "商品",
      navBarIdx: 0
    };
  },
  methods: {
    onItemClick (index) {
      this.navBarIdx = index;
    },
  },
  created() {
    // if (this.showHeader) {
    //   this.$http.get("./shop.json").then(response => {
    //     response = response.body;
    //     if (response.errno === ERR_OK) {
    //       this.seller = Object.assign({}, this.seller, response.data);
    //     }
    //   });
    // }
    const SHOP = require("./shop.json");

    this.seller = Object.assign({}, this.seller, SHOP.seller);
  },
  components: {
    "v-header": header,
    Ratings,
    Seller,
    Goods,
    Tab,
    TabItem,
    Swiper,
    SwiperItem
  }
};
</script>