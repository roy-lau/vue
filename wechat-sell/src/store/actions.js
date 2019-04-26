// actions方便做异步操作
import * as types from './mutation-types'
import { AjaxPlugin, WechatPlugin } from 'vux'


/*==============================*/
// import { playMode } from 'common/js/config'
// import { shuffle } from 'common/js/util'

// function findIndex(list, song) {
//   return list.findIndex((item) => {
//     return item.id === song.id
//   })
// }
export const setWechatConfig = function({ commit, state }, url) {
  return new Promise((resolve, reject) => {
    AjaxPlugin.$http.get('http://139.199.99.154:3005/wechat-signature?url=' + url).then(res => {
      const wechatConfig = res.data.params
      const opts = {
        // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        debug: false,
        // 必填，公众号的唯一标识
        appId: wechatConfig.appId,
        // 必填，生成签名的时间戳
        timestamp: wechatConfig.timestamp,
        // 必填，生成签名的随机串
        nonceStr: wechatConfig.noncestr,
        // 必填，签名
        signature: wechatConfig.signature,
        // 必填，需要使用的JS接口列表，所有JS接口列表
        jsApiList: ['checkJsApi', 'scanQRCode', 'updateAppMessageShareData', 'onMenuShareTimeline']
      }
      console.log('config: ', wechatConfig)
      // WechatPlugin.$wechat.ready(function() {

        WechatPlugin.$wechat.error(function(res) {
          alert("出错了：" + res.errMsg); //这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
        });
        WechatPlugin.$wechat.config(opts)

        resolve(wechatConfig)
      // })
      commit(types.SET_WECHAT_CONFIG, wechatConfig) // 提交顺序播放列表
    })
  })

}

// // 选择播放（点击音乐列表）
// export const selectPlay = function({ commit, state }, { list, index }) {
//   commit(types.SET_SEQUENCE_LIST, list) // 提交顺序播放列表
//   if (state.mode === playMode.random) { // 如果播放模式为随机播放
//     let randomList = shuffle(list)
//     commit(types.SET_PLAYLIST, randomList) // 提交随机播放列表
//     index = findIndex(randomList, list[index])
//   } else { // 顺序播放
//     commit(types.SET_PLAYLIST, list)
//   }
//   commit(types.SET_CURRENT_INDEX, index) // 当前播放音乐的索引
//   commit(types.SET_FULL_SCREEN, true) // 是否显示播放器
//   commit(types.SET_PLAYING_STATE, true) // 播放状态
// }
// // 随机播放
// export const randomPlay = function({ commit }, { list }) {
//   commit(types.SET_PLAY_MODE, playMode.random) // 设置随机播放模式
//   commit(types.SET_SEQUENCE_LIST, list) // 提交顺序播放列表
//   let randomList = shuffle(list)
//   commit(types.SET_PLAYLIST, randomList) // 设置随机播放列表
//   commit(types.SET_CURRENT_INDEX, 0) // 从零开始播放
//   commit(types.SET_FULL_SCREEN, true) // 是否显示播放器
//   commit(types.SET_PLAYING_STATE, true) // 播放状态
// }
