import { WechatPlugin } from 'vux'

const opts = {
  // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  debug: false,
  // 必填，公众号的唯一标识
  appId: 'wxe0cc7044219756c1',
  // 必填，生成签名的时间戳
  timestamp: parseInt(new Date().getTime() / 1000, 10) +'',
  // 必填，生成签名的随机串
  nonceStr: Math.random().toString(36).substr(2,15),
  // 必填，签名
  signature: jsondata.model.signature,
  // 必填，需要使用的JS接口列表，所有JS接口列表
  jsApiList: ['checkJsApi', 'scanQRCode']
}

WechatPlugin.error(function(res) {
  alert("出错了：" + res.errMsg); //这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
});

WechatPlugin.config(opts)

export default WechatPlugin
