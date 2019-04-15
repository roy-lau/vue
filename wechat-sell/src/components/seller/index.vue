<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc">
          <star :size="48" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <span class="icon-favorite" :class="{'active':favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-1px">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item border-1px" v-for="(item,index) in seller.supports" :key="index">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in seller.pics" :key="pic">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title border-1px">商家信息</h1>
        <ul>
          <li class="info-item" v-for="info in seller.infos" :key="info">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script >
  import BScroll from 'better-scroll';
  import {saveToLocal, loadFromLocal} from '@/assets/js/store';
  import star from '@/components/star';
  import split from '@/components/split';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        favorite: (() => {
          return loadFromLocal(this.seller.id, 'favorite', false);
        })()
      };
    },
    computed: {
      favoriteText() {
        return this.favorite ? '已收藏' : '收藏';
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    watch: {
      'seller'() {
        this.$nextTick(() => {
          this._initScroll();
          this._initPics();
        });
      }
    },
    mounted() {
      this.$nextTick(() => {
        this._initScroll();
        this._initPics();
      });
    },
    methods: {
      toggleFavorite(event) {
        if (!event._constructed) {
          return;
        }
        this.favorite = !this.favorite;
        saveToLocal(this.seller.id, 'favorite', this.favorite);
      },
      _initScroll() {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.seller, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      },
      _initPics() {
        if (this.seller.pics) {
          let picWidth = 120;
          let margin = 6;
          let width = (picWidth + margin) * this.seller.pics.length - margin;
          this.$refs.picList.style.width = width + 'px *2';
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.picWrapper, {
                scrollX: true,
                eventPassthrough: 'vertical'
              });
            } else {
              this.picScroll.refresh();
            }
          });
        }
      }
    },
    components: {
      star,
      split
    }
  };
</script>

<style lang="less" rel="stylesheet/less">

.seller {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  .overview {
    position: relative;
    padding: 18px *2;
    .title {
      margin-bottom: 8px *2;
      line-height: 14px *2;
      color: #07111b;
      font-size: 14px *2;
    }
    .desc {
      padding-bottom: 18px *2;
      border-bottom: 1px solid rgba(7,17,27,0.1);
      font-size: 0;
      .star {
        display: inline-block;
        margin-right: 8px *2;
        vertical-align: middle;
      }
      .text {
        display: inline-block;
        margin-right: 12px *2;
        line-height: 18px *2;
        vertical-align: top;
        font-size: 10px *2;
        color: #4d555d;
      }
    }
    .remark {
      display: flex;
      padding-top: 18px *2;
      .block {
        flex: 1;
        text-align: center;
        border-right: 1px solid rgba(7,17,27,0.1);
        &:last-child {
          border: none;
        }
        h2 {
          margin-bottom: 4px *2;
          line-height: 10px *2;
          font-size: 10px *2;
          color: #93999f;
        }
        .content {
          line-height: 24px *2;
          font-size: 10px *2;
          color: #07111b;
          .stress {
            font-size: 24px *2;
          }
        }
      }
    }
    .favorite {
      position: absolute;
      width: 50px *2;
      right: 11px;
      top: 18px *2;
      text-align: center;
      .icon-favorite {
        display: block;
        margin-bottom: 4px *2;
        line-height: 24px *2;
        font-size: 24px *2;
        color: #d4d6d9;
        &.active {
          color: #f01414;
        }
      }
      .text {
        line-height: 10px *2;
        font-size: 10px *2;
        color: #4d555d;
      }
    }
  }
  .bulletin {
    padding: 18px *2 18px *2 0 18px *2;
    .title {
      margin-bottom: 8px *2;
      line-height: 14px *2;
      color: #07111b;
      font-size: 14px *2;
    }
    .content-wrapper {
      padding: 0 12px *2 16px *2 12px *2;
      position: relative;
      &:after {
        display: block;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        border-top: 1px solid rgba(7,17,27,0.1);
        content: ' ';
      }
      .content {
        line-height: 24px *2;
        font-size: 12px *2;
        color: #f01414;
      }
    }
    .supports {
      .support-item {
        padding: 16px *2 12px *2;
        position: relative;
        font-size: 0;
        &:after {
          display: block;
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          border-top: 1px solid rgba(7,17,27,0.1);
          content: ' ';
        }
        &:last-child {
          &:after {
            display: none;
          }
        }
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
          background-image: url("decrease_4@2x.png");
        }
      }
    }
  }
  .pics {
    padding: 18px *2;
    .title {
      margin-bottom: 12px *2;
      line-height: 14px *2;
      color: #07111b;
      font-size: 14px *2;
    }
    .pic-wrapper {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      .pic-list {
        font-size: 0;
        .pic-item {
          display: inline-block;
          margin-right: 6px *2;
          width: 120px *2;
          height: 90px *2;
          &:last-child {
            margin: 0;
          }
        }
      }
    }
  }
  .info {
    padding: 18px *2 18px *2 0 18px *2;
    color: #07111b;
    .title {
      padding-bottom: 12px *2;
      line-height: 14px *2;
      position: relative;
      font-size: 14px *2;
      &:after {
        display: block;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        border-top: 1px solid rgba(7,17,27,0.1);
        content: ' ';
      }
    }
    .info-item {
      padding: 16px *2 12px *2;
      line-height: 16px *2;
      position: relative;
      font-size: 12px *2;
      &:after {
        display: block;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        border-top: 1px solid rgba(7,17,27,0.1);
        content: ' ';
      }
      &:last-child {
        &:after {
          display: none;
        }
      }
    }
  }
}
.seller {
  .bulletin {
    .supports {
      .icon {
        &.discount {
          background-image: url("discount_4@2x.png");
        }
        &.guarantee {
          background-image: url("guarantee_4@2x.png");
        }
        &.invoice {
          background-image: url("invoice_4@2x.png");
        }
        &.special {
          background-image: url("special_4@2x.png");
        }
      }
      .text {
        line-height: 16px *2;
        font-size: 12px *2;
        color: #07111b;
      }
    }
  }
}

</style>