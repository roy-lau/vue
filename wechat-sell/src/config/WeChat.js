import { WechatPlugin,AjaxPlugin } from 'vux'

const baseUrl = 'http://localhost:3000'
AjaxPlugin.$http.get(baseUrl+'/wechat-signature?url='+window.location.href,{
  headers:{host:'http://ded88bc4.ngrok.io'}
}).then(res =>{
  const {params} = res.data

  const opts = {
    // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    debug: false,
    // 必填，公众号的唯一标识
    appId: params.appId,
    // 必填，生成签名的时间戳
    timestamp: params.timestamp,
    // 必填，生成签名的随机串
    nonceStr: params.noncestr,
    // 必填，签名
    signature: params.signature,
    // 必填，需要使用的JS接口列表，所有JS接口列表
    jsApiList: ['checkJsApi', 'scanQRCode']
  }
  console.log(WechatPlugin)
  WechatPlugin.$wechat.error(function(res) {
    alert("出错了：" + res.errMsg); //这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
  });
  
  WechatPlugin.$wechat.config(opts)
})

export default WechatPlugin
