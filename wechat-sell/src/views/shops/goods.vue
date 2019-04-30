<!-- 商品页面 -->
<template>
  <div>
    <div class="goods">
      <!-- 左侧商品菜单 start -->
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item,index) in goods" class="menu-item" :key="index" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
            <span class="text">
              <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <!-- 左侧商品菜单 end -->
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="(item,idx) in goods" class="food-list" :key="idx" ref="foodList">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li v-for="(food,index) in item.foods" :key="index" class="food-item vux-1px-b" @click="selectFood(food,$event)">
                <div class="icon">
                  <img :src="food.icon" />
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cart-control @add="addFood" :food="food" />
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shop-cart ref="shopcart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :seller="seller" />
    </div>
    <food-detailed @add="addFood" :food="selectedFood" ref="foodDetailed" />
  </div>
</template>
<script>
import BScroll from 'better-scroll';
import shopCart from '@/components/shopcart';
import cartControl from '@/components/cartcontrol';
import food from './food';
const ERR_OK = 0;

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      selectedFoods: {},
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
    };
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    },
    selectFoods() {
      let foods = [];
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  created() {
    this.getProductList()
  },
  methods: {
    // 获取商品列表
    getProductList() {
      //如果url里有openid, 设置进cookie
      // let openid = this.$route.query.openid;
      // if (!openid) {
      //   let exp = new Date();
      //   exp.setTime(exp.getTime() + 3600 * 1000); // 过期时间60分钟
      //   // Cookies.set('openid', openid, { expires: 1 })
      // }
      //获取openid
      // if (Cookies.get('openid') == null) {
      // this.$router.push({ query: { returnUrl: encodeURIComponent(process.env.sellUrl + '/#/')} })
      // http://127.0.0.1?returnUrl=http%3A%2F%2F127.0.0.1%2F%23%2F
      // console.log("url: ", process.env.openidUrl + '?returnUrl=' + encodeURIComponent(process.env.sellUrl + '/#/'))
      // location.href = process.env.openidUrl + '?returnUrl=' + encodeURIComponent(process.env.sellUrl + '/#/');
      // }
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      // let selectedGoods = window.selectedGoods;
      // selectedGoods = selectedGoods ? JSON.parse(selectedGoods) : [];
      this.$http.get('sell/buyer/product/list').then(({ data }) => {
        if (data.code === ERR_OK) {
          // selectedGoods.map(item => {
          //   data.map((food, index) => {
          //     food.foods.map((foods, i) => {
          //       if (foods.id === item.id) {
          //         food.foods.splice(i, 1, Object.assign(food.foods[i], {
          //           count: item.count
          //         }));
          //         data.splice(index, 1, food);
          //       }
          //     });
          //   });
          // });
          this.goods = data.data
          // 商品列表加载完成后。 触发滚动，计算高度
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
        }
      });

    },
    selectMenu(index, event) {
      if (!event._constructed) {
        return;
      }
      let foodList = this.$refs.foodList;
      let el = foodList[index];
      this.foodsScroll.scrollToElement(el, 300);
    },
    selectFood(food, event) {
      if (!event._constructed) {
        return;
      }
      this.selectedFood = food;
      this.$refs.foodDetailed.show();
    },
    addFood(target, food) {
      this._drop(target);
    },
    _drop(target) {
      // 体验优化,异步执行下落动画
      this.$nextTick(() => {
        this.$refs.shopcart.drop(target);
      });
    },
    _initScroll() {
      this.meunScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      });

      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      });

      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    _calculateHeight() {
      let foodList = this.$refs.foodList;
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    }
  },
  components: {
    shopCart,
    cartControl,
    'food-detailed': food
  }
};

</script>
<style lang="less">
@import '~vux/src/styles/1px.less';
@import '../../assets/less/icon-block.less';

.goods {
  display: flex;
  position: absolute;
  top: 1px;
  bottom: 92px;
  width: 100%;
  overflow: hidden;

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;

    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      line-height: 14px;

      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        font-weight: 700;
      }

      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;

        &.decrease {
          .block-icon(red, '减');
        }

        &.discount {
          .block-icon-bg(#008c88, '折');
        }

        &.guarantee {
          .block-icon(#0c9, '保');
        }

        &.invoice {
          .block-icon(#920783, '票');
        }

        &.special {
          .block-icon-bg(#00b43c, '特')
        }
      }

      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        font-size: 12px;
        // 原来 border-1px 样式
        position: relative;

        &:after {
          display: block;
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          border-top: 1px solid rgba(7, 17, 27, 0.1);
          content: ' ';
        }
      }
    }
  }

  .foods-wrapper {
    flex: 1;

    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: #93999f;
      background: #f3f5f7;
    }

    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;

      &:last-child {
        margin-bottom: 0;
      }

      .icon {
        flex: 0 0 57px;
        margin-right: 10px;

        img {
          width: 80px;
          height: 80px;
        }
      }

      .content {
        flex: 1;

        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: #07111b;
        }

        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }

        .extra {
          .count {
            margin-right: 12px;
          }
        }

        .price {
          font-weight: 700;
          line-height: 24px;

          .now {
            margin-right: 8px;
            font-size: 14px;
            color: #f01414;
          }

          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: #93999f;
          }
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}

.goods .foods-wrapper .food-item .content .desc,
.goods .foods-wrapper .food-item .content .extra {
  line-height: 10px;
  font-size: 10px;
  color: #93999f;
}

</style>
