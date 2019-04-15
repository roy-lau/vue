
<template>
<!-- 商铺头部 -->
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <!-- 商品详细信息 （弹出层）start -->
    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item,index) in seller.supports" :key="index">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <x-icon type="ios-close-empty" size="60"></x-icon>
        </div>
      </div>
    </transition>
    <!-- 商品详细信息 （弹出层）end -->
  </div>
</template>

<script>
  import star from '@/components/star';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        detailShow: false,
        classMap:['decrease', 'discount', 'special', 'invoice', 'guarantee']
      };
    },
    methods: {
      showDetail() {
        this.detailShow = true;
      },
      hideDetail() {
        this.detailShow = false;
      }
    },
    created() {
    },
    components: {
      star
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
 .header {
  position: relative;
  overflow: hidden;
  color: #fff;
  background: rgba(7,17,27,0.5);
  .content-wrapper {
    position: relative;
    padding: 24px *2 12px *2 18px *2 24px *2;
    font-size: 0;
    .avatar {
      display: inline-block;
      vertical-align: top;
      img {
        width:130px; 
        height:130px; 
        border-radius: 4px;
      }
    }
    .content {
      display: inline-block;
      margin-left: 16px *2;
      .title {
        margin: 2px *2 0 8px *2 0;
        .brand {
          display: inline-block;
          vertical-align: top;
          width: 30px *2;
          height: 18px *2;
          background-image: url("./imgs/brand@3x.png");
          background-size: 30px *2 18px *2;
          background-repeat: no-repeat;
        }
      }
      .description {
        margin-bottom: 10px *2;
        line-height: 12px *2;
        font-size: 12px *2;
      }
      .support {
        .icon {
          display: inline-block;
          vertical-align: top;
          width: 12px *2;
          height: 12px *2;
          margin-right: 4px *2;
          background-size: 12px *2 12px *2;
          background-repeat: no-repeat;
          &.decrease {
            background-image: url("./imgs/decrease_1@3x.png");
          }
        }
      }
    }
    .support-count {
      position: absolute;
      right: 12px *2;
      bottom: 14px *2;
      padding: 0 8px *2;
      height: 24px *2;
      line-height: 24px *2;
      border-radius: 14px *2;
      background: rgba(0,0,0,0.2);
      text-align: center;
      .count {
        vertical-align: top;
        font-size: 10px *2;
      }
      .icon-keyboard_arrow_right {
        margin-left: 2px *2;
        line-height: 24px *2;
        font-size: 10px *2;
      }
    }
  }
  .bulletin-wrapper {
    position: relative;
    height: 28px *2;
    line-height: 28px *2;
    padding: 0 22px *2 0 12px *2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: rgba(7,17,27,0.2);
    .bulletin-title {
      display: inline-block;
      vertical-align: top;
      margin-top: 8px *2;
      width: 22px *2;
      height: 12px *2;
      background-image: url("./imgs/bulletin@3x.png");
      background-size: 22px *2 12px *2;
      background-repeat: no-repeat;
    }
    .icon-keyboard_arrow_right {
      position: absolute;
      font-size: 10px *2;
      right: 12px *2;
      top: 8px *2;
    }
  }
  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px *2);
  }
  .detail {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    backdrop-filter: blur(10px *2);
    opacity: 1;
    background: rgba(7,17,27,0.8);
    .detail-wrapper {
      width: 100%;
      min-height: 100%;
      .detail-main {
        margin-top: 64px *2;
        .name {
          line-height: 16px *2;
          text-align: center;
          font-size: 16px *2;
          font-weight: 700;
        }
        .star-wrapper {
          margin-top: 18px *2;
          padding: 2px *2 0;
          text-align: center;
        }
        .title {
          display: flex;
          width: 80%;
          margin: 28px *2 auto 24px *2 auto;
          .line {
            flex: 1;
            position: relative;
            top: -6px *2;
            border-bottom: 1px solid rgba(255,255,255,0.2);
          }
          .text {
            padding: 0 12px *2;
            font-weight: 700;
            font-size: 14px *2;
          }
        }
        .supports {
          width: 80%;
          margin: 0 auto;
          .support-item {
            padding: 0 12px *2;
            margin-bottom: 12px *2;
            font-size: 0;
            &:last-child {
              margin-bottom: 0;
            }
            .icon {
              display: inline-block;
              width: 16px *2;
              height: 16px *2;
              vertical-align: top;
              margin-right: 6px *2;
              background-size: 16px *2 16px *2;
              background-repeat: no-repeat;
              &.decrease {
                background-image: url("./imgs/decrease_2@3x.png");
              }
            }
          }
        }
        .bulletin {
          width: 80%;
          margin: 0 auto;
          .content {
            padding: 0 12px *2;
            line-height: 24px *2;
            font-size: 12px *2;
          }
        }
      }
    }
    .detail-close {
      position: relative;
      width: 32px *2;
      height: 32px *2;
      margin: -200px auto 0 auto;
      clear: both;
      .vux-x-icon.vux-x-icon-ios-close-empty{
        fill: #fff;
      }
    }
  }
}

.header {
  .content-wrapper {
    .content {
      .title {
        .name {
          margin-left: 6px *2;
          font-size: 16px *2;
          line-height: 18px *2;
          font-weight: bold;
        }
      }
      .support {
        .icon {
          &.discount {
            background-image: url("./imgs/discount_1@3x.png");
          }
          &.guarantee {
            background-image: url("./imgs/guarantee_1@3x.png");
          }
          &.invoice {
            background-image: url("./imgs/invoice_1@3x.png");
          }
          &.special {
            background-image: url("./imgs/special_1@3x.png");
          }
        }
        .text {
          line-height: 12px *2;
          font-size: 10px *2;
        }
      }
    }
  }
  .bulletin-wrapper {
    .bulletin-text {
      vertical-align: top;
      margin: 0 4px *2;
      font-size: 10px *2;
    }
  }
  .detail {
    .detail-wrapper {
      .detail-main {
        .supports {
          .support-item {
            .icon {
              &.discount {
                background-image: url("./imgs/discount_2@3x.png");
              }
              &.guarantee {
                background-image: url("./imgs/guarantee_2@3x.png");
              }
              &.invoice {
                background-image: url("./imgs/invoice_2@3x.png");
              }
              &.special {
                background-image: url("./imgs/special_2@3x.png");
              }
            }
            .text {
              line-height: 16px *2;
              font-size: 12px *2;
            }
          }
        }
      }
    }
  }
}
.header .detail.fade-enter-active,.header .detail.fade-leave-active {
  transition: all .5s;
}
.header .detail.fade-enter,.header .detail.fade-leave-active {
  opacity: 0;
  background: rgba(7,17,27,0);
}

</style>