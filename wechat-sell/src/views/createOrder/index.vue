<!-- 创建订单 -->
<template>
  <div class="create-order">
    <group label-align="justify">
      <cell title="预约时间：" is-link value-align="left" @click.native="toUserInfo">
        <img
          slot="icon"
          width="50"
          style="margin-right:5px;"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII="
        >
        <h4 class="title-date" v-text="orderUserInfo.time"></h4>
        <span>{{orderUserInfo.name}} {{orderUserInfo.phone}}</span>
      </cell>
    </group>
    <br>
    <!-- 菜品列表 start-->
    <group>
      <cell :title="orderList.title">
        <img slot="icon" width="50" style="margin-right:5px;" :src="orderList.avatar">
      </cell>
      <cell-form-preview :list="foodLists"></cell-form-preview>
    </group>
    <!-- 菜品列表 end-->
    <!-- 人数及备注 start -->
    <Group title="人数及备注" label-align="left">
      <popup-picker
        title="人 数"
        :data="peopleNumList"
        v-model="orderData.peopleNum"
        placeholder="便于商家提供餐具"
      ></popup-picker>
      <popup-picker
        title="备 注"
        :data="commentList"
        v-model="orderData.comment"
        placeholder="口味，偏好等"
      ></popup-picker>
    </Group>
    <!-- 人数及备注 end -->
    <!-- 辅助信息 start -->
    <Group title="辅助信息" label-align="left">
      <Cell title="满减优惠" :value="orderData.discount"></Cell>
      <Cell title="商品小计" :value="'¥ '+allPay"></Cell>
    </Group>
    <!-- 辅助信息 end -->
    <div class="footer">
      <div class="money">待支付 ¥ {{allPay}}</div>
      <div class="btn-pay" @click="createOrder">创建订单</div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { Badge, Group, Cell, XInput, CellFormPreview, PopupPicker } from "vux";
export default {
  data() {
    return {
      peopleNumList: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
      commentList: [["不加辣", "微辣", "中辣", "火辣"]],
      orderData: {
        peopleNum: [],
        comment: [],
        discount: "-¥ 0" // 满减优惠
      }
    };
  },
  computed: {
    ...mapGetters(["orderList", "orderUserInfo"]),
    allPay() {
      return this.orderList.foodList.reduce((a, b) => {
        return a + b.count * b.price;
      }, 0);
    },
    foodLists() {
      return this.orderList.foodList.map(item => {
        return {
          label: item.name,
          value: "¥ " + item.count * item.price
        };
      });
    }
  },
  created() {
    document.title = "创建订单";
  },
  methods: {
    // 跳转至用户信息页面
    toUserInfo() {
      this.$router.push("/user-info");
    },
    // 创建订单
    createOrder() {
      let payArr = []
      payArr.push({
        dateTime: this.orderUserInfo.time,
        peopleNum: this.orderData.peopleNum,
        comment: this.orderData.comment,
        tableDining: "", // 餐桌费
        tableWare: "", // 餐具费
        discount: this.orderData.discount, // 满减优惠
        goodsPrice: this.allPay, // 商品小计
        amountTo: this.allPay // 总计
      })
      this.setPayInfo(payArr);

      let url = window.location.href.split("#")[0];

      this.setWechatConfig(url).then(config => {
        alert(url, "wx 响应");
        this.$wechat.chooseWXPay({
          timestamp: config.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: config.noncestr, // 支付签名随机串，不长于 32 位
          package: "", // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
          signType: "", // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: "", // 支付签名
          success: function(res) {
            // 支付成功后的回调函数
            this.$router.push("/payment");
          }
        });
      });
    },
    ...mapMutations({
      setPayInfo: "SET_PAY_INFO"
    }),
    ...mapActions(["setWechatConfig"])
  },
  components: {
    Badge,
    Group,
    Cell,
    XInput,
    CellFormPreview,
    PopupPicker
  }
};
</script>
<style lang="less">
.create-order {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  font-size: 16px;

  // 预约时间
  .title-date {
    color: #3c3c3c;
  }

  // 底部
  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 44px;
    display: flex;
    background-color: #3c3c3c;
    color: #fff;

    // 总价格
    .money {
      flex: 1;
      padding-left: 20px;
      line-height: 44px;
    }

    // 支付按钮
    .btn-pay {
      flex-basis: 110px;
      line-height: 44px;
      text-align: center;
      background-color: #56d176;
    }
  }
}
</style>
