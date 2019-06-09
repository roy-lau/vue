<template>
  <div class="page-cart">
    <el-row>
      <el-col class="m-cart" :span="24">
        <List :cart-data="cart" />
        <p>应付金额： <em class="money">¥ {{total}}</em></p>
        <div class="post">
          <el-button type="primary" @click="submit">提交订单</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import List from "@/components/cart/list"
export default {
  components: {
    List
  },
  data() {
    return {
      cart: []
    }
  },
  computed: {
    total() {
      let total = 0
      this.cart.forEach(item => total += item.price * item.count)
      return total
    }
  },
  methods: {
    // 提交订单
    submit() {
      this.$axios.post('/order/createOrder', {
        id: this.$route.query.id,
        price: this.cart[0].price,
        count: this.cart[0].count
      }).then(({ status, data: { code } }) => {
        if (status === 200 && code === 0) {
          window.location.href = '/order'
        }
      })
    }
  },
  async asyncData(ctx) {
    let { status, data: { code, data: { name, price } } } = await ctx.$axios.post('/cart/getCart', {
      id: ctx.query.id
    })
    if (status === 200 && code === 0 && name) {
      return {
        cart: [{
          name,
          price,
          count: 1
        }],
        caetNo: ctx.query.id
      }
    }
  }
}

</script>
<style lang="scss">
@import "@/assets/css/cart/index.scss";

</style>
