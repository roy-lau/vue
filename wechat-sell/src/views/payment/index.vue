<template>
  <div class="payment">
   
   <Group title="订单信息" label-align="left">
      <Cell title="创建订单时间" :value="payInfo.dateTime" ></Cell>
      <Cell title="订餐人数" :value="payInfo.peopleNum" ></Cell>
      <Cell title="餐具费" :value="payInfo.comment" ></Cell>
      <Cell title="餐桌费" :value="payInfo.tableDining" ></Cell>
      <Cell title="满减优惠" :value="payInfo.tableWare" ></Cell>
      <Cell title="商品小计" :value="payInfo.goodsPrice" ></Cell>
      <Cell title="订单总计" :value="payInfo.amountTo" ></Cell>
    </Group>
    <br />
    <x-button type="primary" @click.native="pay">会员支付 ¥{{payInfo.amountTo}}</x-button>
  </div>
</template>
<script >
import { mapGetters } from "vuex";
import { Toast, Group, Cell, XButton } from "vux";
export default {
  components: {
    Toast,
    Group,
    Cell,
    XButton
  },
   computed: {
    ...mapGetters(["payInfo"]),
   },
  data() {
    return {
    };
  },
  created() {
    document.title = '付款'
  },
  methods: {
    // 支付
    pay(){

      this.$router.push("/order-list")
    }
  }
};

</script>

