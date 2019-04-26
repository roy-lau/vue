<template>
<!-- 购物车页面 -->
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':totalCount>0}">
              <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right" @click.stop.prevent="toCreateOrder">
          <div class="pay" :class="payClass">
            {{payDesc}}
          </div>
        </div>
      </div>
      <div class="ball-container">
        <div v-for="(ball,i) in balls" :key="i">
          <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="(food,idx) in selectFoods" :key="idx">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol @add="addFood" :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" @click="hideList" v-show="listShow"></div>
    </transition>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import { mapMutations } from 'vuex'
  import cartcontrol from '@/components/cartcontrol';
export default {
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [
            {
              price: 10,
              count: 1
            }
          ];
        }
      },
      seller: {
        type: Object
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        balls: [
          {show: false},
          {show: false},
          {show: false},
          {show: false},
          {show: false}
        ],
        dropBalls: [],
        fold: true
      };
    },
    computed: {
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total.toFixed(2); // 保留两位小数（避免精度问题）
      },
      totalCount() {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}元起送`;
        } else {
          return '创建订单';
        }
      },
      payClass() {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough';
        } else {
          return 'enough';
        }
      },
      listShow() {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
        return show;
      }
    },
    methods: {
      drop(el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      toggleList() {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      hideList() {
        this.fold = true;
      },
      empty() {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      },
      // 跳转至 创建订单
      toCreateOrder() {
        if (this.totalPrice < this.minPrice) {
          return;
        }
        let data = {
          title: this.seller.name,
          avatar: this.seller.avatar,
          foodList: this.selectFoods
        }
        this.setOrderList(data)
        this.$router.push({ path: '/create-order'})
      },
      addFood(target) {
        this.drop(target);
      },
      beforeDrop(el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      dropping(el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
          el.addEventListener('transitionend', done);
        });
      },
      afterDrop(el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      },
       ...mapMutations({
            setOrderList: 'SET_ORDER_LIST'
        })
    },
    components: {
      cartcontrol
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  .shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 50;
  width: 100%;
  height: 48px *2;
  .content {
    display: flex;
    background: #141d27;
    font-size: 0;
    color: rgba(255,255,255,0.4);
    .content-left {
      flex: 1;
      .logo-wrapper {
        display: inline-block;
        vertical-align: top;
        position: relative;
        top: -10px *2;
        margin: 0 12px *2;
        padding: 6px *2;
        width: 56px *2;
        height: 56px *2;
        box-sizing: border-box;
        border-radius: 50%;
        background: #141d27;
        .logo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          text-align: center;
          background: #2b343c;
          &.highlight {
            background: #00a0dc;
          }
          .icon-shopping_cart {
            line-height: 44px *2;
            font-size: 24px *2;
            color: #80858a;
            &.highlight {
              color: #fff;
            }
          }
        }
        .num {
          position: absolute;
          top: 0;
          right: 0;
          width: 24px *2;
          height: 16px *2;
          line-height: 16px *2;
          text-align: center;
          border-radius: 16px *2;
          font-size: 9px *2;
          font-weight: 700;
          color: #fff;
          background: #f01414;
          box-shadow: 0 4px *2 8px *2 0 rgba(0,0,0,0.4);
        }
      }
      .price {
        display: inline-block;
        vertical-align: top;
        margin-top: 12px *2;
        line-height: 24px *2;
        padding-right: 12px *2;
        box-sizing: border-box;
        border-right: 1px *2 solid rgba(255,255,255,0.1);
        font-size: 16px *2;
        font-weight: 700;
        &.highlight {
          color: #fff;
        }
      }
      .desc {
        display: inline-block;
        vertical-align: top;
        margin: 12px *2 0 0 12px *2;
        line-height: 24px *2;
        font-size: 10px *2;
      }
    }
    .content-right {
      flex: 0 0 105px *2;
      width: 105px *2;
      .pay {
        height: 48px *2;
        line-height: 48px *2;
        text-align: center;
        font-size: 12px *2;
        font-weight: 700;
        &.not-enough {
          background: #2b333b;
        }
        &.enough {
          background: #00b43c;
          color: #fff;
        }
      }
    }
  }
  .ball-container {
    .ball {
      position: fixed;
      left: 32px *2;
      bottom: 22px *2;
      z-index: 200;
      transition: all .4s cubic-bezier(.49,-.29,.75,.41);
      .inner {
        width: 16px *2;
        height: 16px *2;
        border-radius: 50%;
        background: #00a0dc;
        transition: all .4s linear;
      }
    }
  }
  .shopcart-list {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    transform: translate3d(0,-100%,0);
    .list-header {
      height: 40px *2;
      line-height: 40px *2;
      padding: 0 18px *2;
      background: #f3f5f7;
      border-bottom: 1px *2 solid rgba(7,17,27,0.1);
      .title {
        float: left;
        font-size: 14px *2;
        color: #07111b;
      }
      .empty {
        float: right;
        font-size: 12px *2;
        color: #00a0dc;
      }
    }
    .list-content {
      padding: 0 18px *2;
      max-height: 217px *2;
      overflow: hidden;
      background: #fff;
      .food {
        position: relative;
        padding: 12px *2 0;
        box-sizing: border-box;
        position: relative;
        &:after {
          display: block;
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          border-top: 1px *2 solid rgba(7,17,27,0.1);
          content: ' ';
        }
        .name {
          line-height: 24px *2;
          font-size: 14px *2;
          color: #07111b;
        }
        .price {
          position: absolute;
          right: 90px *2;
          bottom: 12px *2;
          line-height: 24px *2;
          font-size: 14px *2;
          font-weight: 700;
          color: #f01414;
        }
        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 6px *2;
        }
      }
    }
  }
}
.shopcart .shopcart-list.fold-enter-active,.shopcart .shopcart-list.fold-leave-active {
  transition: all .5s;
}
.shopcart .shopcart-list.fold-enter,.shopcart .shopcart-list.fold-leave-active {
  transform: translate3d(0,0,0);
}
.list-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
  backdrop-filter: blur(10px *2);
  opacity: 1;
  background: rgba(7,17,27,0.6);
}
.list-mask.fade-enter-active,.list-mask.fade-leave-active {
  transition: all .5s;
}
.list-mask.fade-enter,.list-mask.fade-leave-active {
  opacity: 0;
  background: rgba(7,17,27,0);
}

</style>