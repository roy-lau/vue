import * as types from './mutation-types'

// mutation 是同步函数
const matutaions = {
  [types.SET_WECHAT_CONFIG](state, wechatConfig) {
        state.wechatConfig = wechatConfig
  },
  [types.SET_ORDER_LIST](state, order) {
        state.orderList = order
  },
  [types.SET_ORDER_USER_INFO](state, userInfo) {
      state.orderUserInfo = userInfo
      },
}

export default matutaions
