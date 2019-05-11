<!-- 创建订单 -->
<template>
  <div class="payment">
    <group label-align="justify"> 
      <cell title="预约时间：" is-link value-align="left" @click.native="toUserInfo">
        <h4 class="title-date" v-text="orderUserInfo.time"></h4>
        <span> {{orderUserInfo.name}} {{orderUserInfo.phone}}</span>
      </cell>
    </group><br />
    <!-- 菜品列表 start-->
    <div class="food-info">
      <div class="card-hd">
        <img class="avator" :src="orderList.avatar">
        <span class="title">{{orderList.title}}</span>
      </div>
      <div v-for="(item,index) in orderList.foodList" class="food-item" :key="index">
        <label>{{item.name}}</label>
        <div class="mount">
          <span class="number" v-if="item.count > 1">x{{item.count}}</span>
          ¥ {{item.count * item.price}}
        </div>
      </div>
    </div>
    <!-- 菜品列表 end-->
    <!-- 人数及备注 start -->
      <Group title="人数及备注" label-align="left">
      <x-input title="人数" v-model="orderData.peopleNum" :required="true"></x-input>
      <x-input title="备注" v-model="orderData.comment" ></x-input>
    </Group>
    <!-- 人数及备注 end -->
    <!-- 辅助信息 start -->
      <Group title="辅助信息" label-align="left">
      <x-input title="满减优惠" v-model="orderData.discount" ></x-input>
      <x-input title="商品小计" v-model="allPay" ></x-input>
    </Group>
    <!-- 辅助信息 end -->
    <div class="footer">
      <div class="money">待支付  ¥ {{this.allPay}}</div>
      <div class="btn-pay" @click="createOrder">创建订单</div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { Badge, Group, Cell, XInput } from "vux";
export default {
  data() {
    return {
      orderData:{
        peopleNum:'',
        comment:'',
        discount:'-¥ 0',
      }
    };
  },
  computed: {
    ...mapGetters(["orderList","orderUserInfo"]),
    allPay() {
      return this.orderList.foodList.reduce((a, b) => {
        return a + b.count * b.price;
      }, 0);
    }
  },
  created() {
    document.title = "创建订单";
  },
  methods: {
    // 跳转至用户信息页面
    toUserInfo(){
      this.$router.push("/user-info")
    },
    // 创建订单
    createOrder() {},
  },
  components: {
    Badge,
    Group,
    Cell,
    XInput
  }
};
</script>
<style lang="less">
.payment {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  font-size: 16px;

  // 预约时间
  .title-date{
    color: #3c3c3c;
  }
  .food-info {
    background-color: #fff;

    .avator {
      width: 19px;
      height: 19px;
      margin-right: 10px;
    }

    .card-hd {
      display: flex;
      align-items: center;
      padding: 14px;
      border-bottom: 1px solid #eee;
    }

    .food-item {
      padding: 0 14px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #eee;

      label {
        display: inline-block;
        padding: 14px 0;
        flex: 1;
        color: #666;
      }

      .mount {
        display: flex;
        flex: 1;
        justify-content: flex-end;

        .number {
          padding-right: 20px;
        }
      }
    }
  }

  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 44px;
    display: flex;
    background-color: #3c3c3c;
    color: #fff;

    .money {
      flex: 1;
      padding-left: 20px;
      line-height: 44px;
    }

    .btn-pay {
      flex-basis: 110px;
      line-height: 44px;
      text-align: center;
      background-color: #56d176;
    }
  }
}
</style>
