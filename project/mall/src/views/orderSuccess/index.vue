<template>
  <div id="order-success">
    <!-- 面包屑导航 start-->
        <div class="nav-breadcrumb-wrap">
            <div class="container">
                <nav class="nav-breadcrumb">
                    <a href="/">{{$t("home.nav1")}}</a>
                    <span>{{$t("orderSuccess.orderConfirm")}}</span>
                </nav>
            </div>
        </div>
        <!-- 面包屑导航 -->
  <div class="container">
    <div class="page-title-normal">
      <h2 class="page-title-h2"><span>{{$t("orderConfirm.checkOut")}}</span></h2>
    </div>
    <!-- 进度条 -->
    <div class="check-step">
      <ul>
         <li class="cur">{{$t("address.confirmAddress")}}</li>
          <li class="cur">{{$t("address.viewYourOrder")}}</li>
          <li class="cur">{{$t("address.makePayment")}}</li>
          <li class="cur">{{$t("address.orderConfirmation")}}</li>
      </ul>
    </div>

    <div class="order-create">
      <div class="order-create-pic">
        <img src="http://imooc.51purse.com/static/ok-2.png" alt="">
      </div>
      <div class="order-create-main">
        <h3 v-html='$t("orderSuccess.congratulations")'></h3>
        <p>
          <span>{{$t("orderSuccess.orderID")}}: {{orderId}}</span>
          <span>{{$t("orderSuccess.orderTotal")}}：{{orderTotal|currency('¥')}}</span>
        </p>
        <div class="order-create-btn-wrap">
          <div class="btn-l-wrap">
            <router-link to="/cart" class="btn btn--m">{{$t("orderSuccess.cartList")}}</router-link>
          </div>
          <div class="btn-r-wrap">
            <router-link to="/" class="btn btn--m">{{$t("orderSuccess.goodsList")}}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>

export default {
    name: 'order-success',
    components: {},
    data(){
      return{
        orderTotal:'',
        orderId:''
      }
    },
    mounted(){
      this.getOrderDetail()
    },
    methods:{
      getOrderDetail(){
        let _orderId = this.$route.query.orderId
        if (!_orderId) return

        this.$axios.get("users/orderDetail",{params:{orderId:_orderId}}).then(res =>{
          let data = res.data
          if (data.status) {
            alert(data.msg)
          }else{
            this.orderId = _orderId
            this.orderTotal = data.result.orderTotal
          }
        })
      }
    }
}
</script>

