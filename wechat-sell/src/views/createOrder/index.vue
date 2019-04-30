<!-- 创建订单 -->
<template>
  <div class="payment">
    <Group label-width="4.5em" label-margin-right="2em" label-align="right">
      <Cell title="Cell" value="value" is-link></Cell>
      <Cell title="Cell" value="value" is-link value-align="left"></Cell>
       <!-- <x-input title="上报人" v-model=""></x-input> -->
     <x-input placeholder="I'm placeholder"></x-input>
    </Group>
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
    <div class="footer">
      <div class="money">待支付¥{{this.allPay}}</div>
      <div class="btn-pay" @click="createOrder">创建订单</div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { Badge, Group, Cell, XInput } from 'vux'
export default {
  data() {
    return {
      name: "",
      phone: "",
      address: ""
    };
  },
  computed: {
    ...mapGetters(['orderList']),
    allPay() {
      return this.orderList.foodList.reduce((a, b) => {
        return a + b.count * b.price;
      }, 0);
    }
  },
  created() {
    document.title = "创建订单"
  },
  methods: {
    // 创建订单
    createOrder() {

    }
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

  .user-info {
    margin-top: 10px;
    background-color: #fff;
    margin-bottom: 20px;

    .item {
      padding: 0 14px;
      display: flex;
      border-bottom: 1px solid #eee;

      label {
        padding: 14px 0;
        display: inline-block;
        flex-basis: 93px;
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
