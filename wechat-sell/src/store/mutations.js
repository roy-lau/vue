import * as types from './mutation-types'

// mutation 是同步函数
const matutaions = {
  [types.SET_WECHAT_CONFIG](state, wechatConfig) {
        state.wechatConfig = wechatConfig
  },
  [types.SET_ORDER_LIST](state, order) {
        state.orderList = order
  },

  // [types.SET_SINGER](state, singer) {
  //   state.singer = singer
  // },
  // [types.SET_PLAYING_STATE](state, flag) {
  //   state.playing = flag
  // },
  // [types.SET_FULL_SCREEN](state, flag) {
  //   state.fullScreen = flag
  // },
  // [types.SET_PLAYLIST](state, list) {
  //   state.playList = list
  // },
  // [types.SET_SEQUENCE_LIST](state, list) {
  //   state.sequenceList = list
  // },
  // [types.SET_PLAY_MODE](state, mode) {
  //   state.mode = mode
  // },
  // [types.SET_CURRENT_INDEX](state, flag) {
  //   state.currentIndex = flag
  // }
}

export default matutaions
