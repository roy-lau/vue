<template>
  <div class="order-list">
   
   <Group title="订单信息" label-align="left" v-for="(item,index) in payInfo" :key="index">
      <Cell title="创建订单时间" :value="item.dateTime" ></Cell>
      <Cell title="订餐人数" :value="item.peopleNum" ></Cell>
      <Cell title="餐具费" :value="item.comment" ></Cell>
      <Cell title="餐桌费" :value="item.tableDining" ></Cell>
      <Cell title="满减优惠" :value="item.tableWare" ></Cell>
      <Cell title="商品小计" :value="item.goodsPrice" ></Cell>
      <Cell title="订单总计" :value="item.amountTo" ></Cell>
    </Group>
    <br />

    <!-- 底部导航 end -->
    <tabbar>
      <tabbar-item link="/">
        <img slot="icon" src="">
        <span slot="label">门店</span>
      </tabbar-item>
      <tabbar-item selected >
        <img slot="icon" src="">
        <span slot="label">订单</span>
      </tabbar-item>
      <tabbar-item>
        <img slot="icon" src="">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
    <!-- 底部导航 end -->
  </div>
</template>
<script >
import { mapGetters } from "vuex";
import { Group, Cell,Tabbar, TabbarItem } from "vux";
export default {
  components: {
    Group,
    Cell,
    Tabbar, TabbarItem
  },
   computed: {
    ...mapGetters(["payInfo"]),
   },
  data() {
    return {
    };
  },
  created() {
    document.title = '订单'
  },
  methods: {
    // 支付
   
  }
};

</script>

