<template>
  <div class="payment">
    <div class="user-info">
      <div class="item">
        <label class="label">联系人</label>
        <input placeholder="姓名" class="input" v-model="name" type="text">
      </div>
      <div class="item">
        <label>联系电话</label>
        <input placeholder="你的手机号" v-model="phone" type="text">
      </div>
      <div class="item">
        <label>送餐地址</label>
        <input placeholder="送餐地址" v-model="address" type="text">
      </div>
    </div>
    <div class="food-info">
      <div class="card-hd">
        <img class="avator" :src="shopInfo.avatar">
        <span class="title">{{shopInfo.title}}</span>
      </div>

      <div v-for="(item,index) in shopInfo.foodList" class="food-item" :key="index">
        <label>{{item.name}}</label>
        <div class="mount">
          <span class="number" v-if="item.count > 1">x{{item.count}}</span>
          ¥{{item.count * item.price}}
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="money">待支付¥{{this.allPay}}</div>
      <div class="btn-pay" @click="createOrder">创建订单</div>
    </div>
  </div>
</template>
<script >
export default {
  data() {
    return {
      shopInfo: {},
      name: "",
      phone: "",
      address: ""
    };
  },
  computed: {
    allPay() {
      return this.shopInfo.foodList.reduce((a, b) => {
        return a + b.count * b.price;
      }, 0);
    }
  },
  watch: {
    $route: "fetchData"
  },
  created() {
		this.shopInfo = JSON.parse(sessionStorage.getItem('shopInfo'))
  },
  methods: {
    // 创建订单
    createOrder() {
			location.href = process.env.openidUrl + '?returnUrl=' + encodeURIComponent(process.env.sellUrl + '/#/');
			console.log(process.env.openidUrl + '?returnUrl=' + encodeURIComponent(process.env.sellUrl + '/#/'))
			console.log(this.$route.query.openid)
			return
      let _foodList = [];
      this.shopInfo.foodList.forEach(good => {
        _foodList.push({ productId: good.id, productQuantity: good.count });
      });

      this.$http
        .post("/sell/buyer/order/create", {
          openid: this.$route.query.openid,
          phone: this.phone,
          name: this.name,
          address: this.address,
          items: JSON.stringify(_foodList)
        })
        .then(respones => {
          respones = respones.body;
          if (!respones.code) {
            location.href =
              process.dev.wechatPayUrl +
              "?openid=" +
              getCookie("openid") +
              "&orderId=" +
              respones.data.orderId +
              "&returnUrl=" +
              encodeURIComponent(
                process.dev.sellUrl + "/#/order/" + respones.data.orderId
              );
          } else {
            alert(respones.msg);
          }
        });

      window.selectedGoods = "[]";
      // 支付成功清空localstorage selectedGoods
    }
  }
};
function getCookie(name) {
  var arr;
  var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
  else return null;
}
</script>

<style lang="less" >
.payment {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;

  .user-info {
    margin-top: 10px * 2;
    background-color: #fff;
    margin-bottom: 20px * 2;
    .item {
      padding: 0 14px * 2;
      display: flex;
      border-bottom: 1px * 2 solid #eee;
      label {
        padding: 14px * 2 0;
        display: inline-block;
        flex-basis: 93px * 2;
        color: #333;
      }
      input {
        display: block;
        flex: 1;
        outline: 0;
        color: #333;
      }
    }
  }
  .food-info {
    background-color: #fff;
    .avator {
      width: 19px * 2;
      height: 19px * 2;
      margin-right: 10px * 2;
    }
    .card-hd {
      display: flex;
      align-items: center;
      padding: 14px * 2;
      border-bottom: 1px * 2 solid #eee;
    }
    .food-item {
      padding: 0 14px * 2;
      display: flex;
      align-items: center;
      border-bottom: 1px * 2 solid #eee;
      label {
        display: inline-block;
        padding: 14px * 2 0;
        flex: 1;
        color: #666;
      }
      .mount {
        display: flex;
        flex: 1;
        justify-content: flex-end;
        .number {
          padding-right: 20px * 2;
        }
      }
    }
  }
  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 44px * 2;
    display: flex;
    background-color: #3c3c3c;
    color: #fff;
    .money {
      flex: 1;
      padding-left: 20px * 2;
      line-height: 44px * 2;
    }
    .btn-pay {
      flex-basis: 110px * 2;
      line-height: 44px * 2;
      text-align: center;
      background-color: #56d176;
    }
  }
}
</style>
