<!-- 首页 -->
<template>
  <div id="home">
    <!-- 轮播图 start -->
    <Swiper :list="imgsList" :show-desc-mask="false" height="5rem" dots-position="center" :auto="true" :loop="true" />
    <!-- 轮播图 end -->
    <!-- 八宫格 导航 start -->
    <div class="panel-box">
      <Flexbox>
        <flexbox-item>
          <div class="item-box" @click="onScanIt"><i class="icon iconfont icon-scanit"></i><span>扫一扫</span></div>
        </flexbox-item>
        <flexbox-item>
          <router-link :to="{'path':'shops'}">
            <div class="item-box"><i class="icon iconfont icon-tableware"></i><span>预约点餐</span></div>
          </router-link>
        </flexbox-item>
        <flexbox-item>
          <div class="item-box" @click="recommendFriends"><i class="icon iconfont icon-people"></i><span>推荐好友</span></div>
        </flexbox-item>
        <flexbox-item>
          <div class="item-box"><i class="icon iconfont icon-shop"></i><span>商铺位置</span></div>
        </flexbox-item>
      </Flexbox>
      <Flexbox>
        <flexbox-item>
          <div class="item-box"><i class="icon iconfont icon-phone-1"></i><span>电话联系</span></div>
        </flexbox-item>
        <flexbox-item>
          <div class="item-box"><i class="icon"></i><span></span></div>
        </flexbox-item>
        <flexbox-item>
          <div class="item-box"><i class="icon"></i><span></span></div>
        </flexbox-item>
        <flexbox-item>
          <div class="item-box"><i class="icon"></i><span></span></div>
        </flexbox-item>
      </Flexbox>
    </div>
    <!-- 八宫格 导航 end -->
    <!-- 商家店铺基本信息 start -->
    <div class="panel-box">
      <ul class="base-info-list">
        <li>
          <i class="icon iconfont icon-phone"></i>
          <span class="title">电话 :</span>
          <span class="content"><a href="tel:400-666-666">400-666-666</a></span>
          <i class="tips">拨打</i>
        </li>
        <li>
          <i class="icon iconfont icon-address"></i>
          <span class="title">商家地址 :</span>
          <span class="content">北京市东城区故宫博物馆</span>
          <i class="tips">导航</i>
        </li>
        <li>
          <i class="icon iconfont icon-time"></i>
          <span class="title">营业时间 :</span>
          <span class="content">早上8点 - 下午8点</span>
          <!-- <i class="tips"></i> -->
        </li>
      </ul>
    </div>
    <!-- 商家店铺基本信息 end -->
    <!-- 优惠信息 start -->
    <div class="panel-box">
      <ul class="discount-info-list">
        <li><i class="icon-block-blue">付</i><span>该商家支持在线支付</span></li>
        <li><i class="icon-block-red">惠</i><span>消费满10元配送</span></li>
      </ul>
    </div>
    <!-- 优惠信息 end -->
    <!-- 查看店铺 start -->
    <div class="panel-box">
      <router-link :to="{path:'/order/1223'}">
        <p class="lookShop">查看店铺<x-icon type="ios-arrow-forward" class="arrow-right" size="30">右箭头</x-icon>
        </p>
      </router-link>
    </div>
    <!-- 查看店铺 end -->
    <div class="message-bar">
      <ul class="message-bar-box">
        <li><i class="icon iconfont icon-address"></i><span>一键导航</span></li>
        <li><i class="icon iconfont icon-phone-1"></i><span>一键拨号</span></li>
        <li><i class="icon iconfont icon-inline-phone"></i><span>在线客服</span></li>
      </ul>
    </div>
  </div>
</template>
<script>
import {
  Swiper,
  Panel,
  Flexbox,
  FlexboxItem
} from 'vux'

import { mapActions } from 'vuex'

export default {
  name: 'home',
  components: {
    Swiper,
    Panel,
    Flexbox,
    FlexboxItem
  },
  data() {
    return {
      imgsList: [{
        url: 'javascript:',
        img: require('./banner.jpg'),
      }, {
        url: 'javascript:',
        img: require('./banner.jpg'),
        fallbackImg: require('./banner.jpg')
      }],
      goods: []
    }
  },
  methods: {
    // 扫一扫
    onScanIt() {
      let url = window.location.href.split('#')[0]

      this.setWechatConfig(url).then(res => {
        alert(url,'wx 响应')
        this.$wechat.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
          success: function(res) {
            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            alert("扫描结果：" + result);
            window.location.href = result; //因为我这边是扫描后有个链接，然后跳转到该页面
          }
        });

      })
    },
    // 推荐好友
    recommendFriends() {
      let url = window.location.href.split('#')[0]

      this.setWechatConfig(url).then(res => {
        alert(url,'wx 响应')
        this.$wechat.onMenuShareTimeline({
          title: 'hello VUX',
          success: function() {
            console.log('用户点击了分享后执行的回调函数')
          }
        })

      })
    },
    ...mapActions([
      'setWechatConfig',
    ])
  },
  created() {},
  mounted() {}
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import "./fonts/iconfont.css";

#home {
  background-color: #f0f0f0;
  font-size: 18px;
  .panel-box {
    background-color: white;
    margin-top: 20px /1.3;
    box-shadow: 0 12px /1.3 14px /1.3 12px /1.3 #f3f3f3;

    li {
      height: 100px /1.3;
      line-height: 100px /1.3;
      border-bottom: 2px /1.3 solid #f3f3f3;
    }
  }

  // 八宫格
  .item-box {

    i,
    span {
      display: block;
      text-align: center;
    }

    i.icon {
      font-size: 58px /1.3;
    }

    .icon-scanit {
      color: #69a238;
    }

    .icon-tableware {
      color: #31ae93
    }

    .icon-people {
      color: #df8c88;
    }

    .icon-shop {
      color: #369ce4;
    }

    .icon-phone-1 {
      color: #40af34;
    }

  }

  /* 店铺基本信息 */
  .base-info-list {
    i.icon {
      margin: 0 16px /1.3;
    }

    .tips {
      background-color: #50b2fc;
      font-size: 22px /1.3;
      vertical-align: top;
      color: white;
      padding: 5px /1.3;
      border-radius: 5px /1.3;
    }
  }

  // 优惠信息
  .discount-info-list {
    i {
      padding: 3px /1.3;
      text-align: center;
      margin: 0 16px /1.3;
      font-size: 24px /1.3;
    }

    .icon-block-blue {
      color: #7eb4ed;
      border: 3px /1.3 solid #7eb4ed;
    }

    .icon-block-red {
      color: white;
      background-color: #eb5532;
      border: 3px /1.3 solid #eb5532;
    }
  }

  // 查看店铺
  .lookShop {
    height: 80px /1.3;
    line-height: 80px /1.3;
    text-indent: 12px /1.3;

    .arrow-right {
      float: right;
      margin-right: 20px /1.3;
      margin-top: 20px /1.3;
      vertical-align: middle;
    }
  }

  // 消息侧边栏
  .message-bar {
    position: fixed;
    right: 0;
    top: 35%;
    width: 100px /1.3;
    height: 430px /1.3;
    padding: 15px /1.3 0;
    border-bottom-left-radius: 20px /1.3;
    border-top-left-radius: 20px /1.3;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.6);

    .message-bar-box {
      li {
        color: white;
        display: block;
        text-align: center;
        line-height: 70px /1.3;
        border-bottom: 1px /1.3 solid silver;

        span {
          font-size: 22px /1.3;
        }
      }

      li:last-child {
        border-bottom: none;
      }

      .icon {
        font-size: 58px /1.3;
        text-align: center;
        display: block;
      }

      .icon-address {
        color: #1fa3ed;
      }

      .icon-phone-1 {
        color: #f19423;
      }

      .icon-inline-phone {
        color: tomato;
      }
    }
  }
}

</style>
