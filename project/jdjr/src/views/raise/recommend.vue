<template lang="html">
    <Panel title="In货推荐" :class="$style.panel">
        <section :class="$style.content">
            <div :class="$style.item" v-for="item in items" :key="item.catory">
                <img :src="item.catory" alt="">
                <section :class="$style.list">
                    <div :class="$style.product" v-for="product in item.list" :key="product.img">
                        <img :src="product.img" alt="">
                        <p :class="$style.title">{{ product.title }}</p>
                        <p :class="$style.price"><em>{{ product.price }}</em>起</p>
                        <article>
                            <div :class="$style.wrapper">
                                <div :class="$style.inner" :style="{width:product.progress+'%'}"/>
                            </div>
                            <p>{{ product.progress }}%</p>
                        </article>
                        <label v-text="product.tips" v-if="product.tips"/>
                    </div>
                </section>
            </div>
        </section>
    </Panel>
</template>

<script>
import Panel from "@/components/panel.vue"
export default {
    components: {
        Panel,
    },
    data() {
        return {
            items: [{
                catory: require("./imgs/recommend-catory-1.png"),
                list: [{
                    img: require("./imgs/recommend-list-1.jpg"),
                    title: "双响炮蓝牙音箱",
                    price: "29.00",
                    progress: 172,
                    tips:"精选"
                }, {
                    img: require("./imgs/recommend-list-2.jpg"),
                    title: "脑波相机",
                    price: "998.00",
                    progress: 259,
                }],
            }, {
                catory: require("./imgs/recommend-catory-2.png"),
                list: [{
                    img: require("./imgs/recommend-list-3.jpg"),
                    title: "智能电动牙刷",
                    price: "19.00",
                    progress: 481,
                }, {
                    img: require("./imgs/recommend-list-4.jpg"),
                    title: "烟草加热电子烟",
                    price: "258.00",
                    progress: 105,
                }],
            }, {
                catory: require("./imgs/recommend-catory-3.png"),
                list: [{
                    img: require("./imgs/recommend-list-5.jpg"),
                    title: "赖公高淮封藏老酒",
                    price: "99.00",
                    progress: 199,
                }, {
                    img: require("./imgs/recommend-list-6.jpg"),
                    title: "泗洪花雕醉蟹",
                    price: "58.00",
                    progress: 222,
                }],
            }],
        }
    },
}
</script>

<style lang="scss" module>
  @import "@/assets/css/element.scss";
  .panel{
    @include panel;
    .content{
      @include flex;
      .item{
        >img{
          display: block;
          width: 100%;
          height: 170px;
        }
        margin-bottom: 40px;
        .list{
          @include flex(row);
          .product{
            width:50%;
            height: 396px;
            box-sizing: border-box;
            background: rgba(0,0,0,.02);
            text-align: center;
            position: relative;
            img{
              width: 180px;
              height: 180px;
              margin: 44px auto 20px;
            }
            .title{
              font-family: PingFangSC-Medium;
              font-size: 28px;
              color: #444;
            }
            .price{
              font-family: PingFangSC-Semibold;
              font-size: 20px;
              color: #999;
              height: 48px;
              line-height: 48px;
              em{
                font-size: 36px;
                color: #FF3232;
                margin-right: 4px;
                &:before{
                  content: "￥";
                  font-size: 28px;
                }
              }
            }
            article{
              @include flex(row);
              align-items: center;
              justify-content: space-around;
              padding: 0 20px;
              height: 30px;
              line-height: 30px;
              margin-top: 16px;
              .wrapper{
                width: 144px;
                height: 10px;
                background: #F6E6E6;
                border-radius: 22px;
                .inner{
                  width: 40%;
                  max-width: 100%;
                  height: 10px;
                  background-image: linear-gradient(270deg,#F55 1%,#FF9C31 100%);
                  border-radius: 22px;
                }
              }
              p{
                font-size: 24px;
                color: #999;
              }
            }
            label{
              position: absolute;
              left: 0;
              top: 0;
              font-family: PingFangSC-Medium;
              font-size: 20px;
              color: #ff0000;
              text-align: center;
              padding: 4px 8px;
              background-image: linear-gradient(-35deg,#C1C1C1 0,#ACACAC 100%);
            }
          }
        }
      }
    }
  }
</style>
