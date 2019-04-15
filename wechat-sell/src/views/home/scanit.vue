<template>
    <div class="item-box" @click="clickScanIt"><i class="icon iconfont icon-scanit"></i><span>扫一扫</span></div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    methods: {
      clickScanIt: function () {

        this.$wechat.ready(function () {
          this.$wechat.checkJsApi({
            jsApiList: ['scanQRCode'],
            success: function (res) {

            }
          });

          this.$wechat.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
              var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
              alert("扫描结果：" + result);
              window.location.href = result; //因为我这边是扫描后有个链接，然后跳转到该页面
            }
          });

        });
      }

    }
  }

</script>
