<template>
  <Panel title="更多服务" :class="$style.panel">
    <section :class="$style.list">
      <div :class="$style.item" v-for="item in items" :key="item.img">
        <router-link :to="item.href">
          <img :src="item.img" :alt="item.href">
          <h4 v-text="item.text"></h4>
        </router-link>
      </div>
    </section>
  </Panel>
</template>
<script>
import Panel from "@/components/panel";
export default {
  components: {
    Panel
  },
  data() {
    return {
      items: [
        {
          img:  require("./imgs/service-1.png"),
          href: "https://github.com/roy-lau?" + Math.random(),
          text: "小白卡"
        },
        {
          img:  require("./imgs/service-2.png"),
          href: "https://github.com/roy-lau?" + Math.random(),
          text: "白条商城"
        },
        {
          img: require("./imgs/service-3.png"),
          href: "https://github.com/roy-lau?" + Math.random(),
          text: "消费分期"
        },
        {
          img:  require("./imgs/service-4.png"),
          href: "https://github.com/roy-lau?" + Math.random(),
          text: "借钱"
        },
        {
          img:  require("./imgs/service-5.png"),
          href: "https://github.com/roy-lau?" + Math.random(),
          text: "白条提额"
        },
        {
          img:  require("./imgs/service-6.png"),
          href: "https://github.com/roy-lau?" + Math.random(),
          text: "白条闪付"
        },
        {
          img:  require("./imgs/service-7.png"),
          href: "https://github.com/roy-lau?" + Math.random(),
          text: "小白会玩"
        },
        {
          img: require("./imgs/service-8.png"),
          href: "https://github.com/roy-lau?" + Math.random(),
          text: "钢镚"
        }
      ]
    };
  }
};
</script>
<style lang="scss" module>
@import "@/assets/css/element.scss";
.panel {
  @include panel;
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
}
</style>

