// actions方便做异步操作
import * as types from './mutation-types'

export const selectPlay = function({ commit, state }, { list, index }) {
  commit(types.SET_SEQUENCE_LIST, list) // 提交顺序播放列表
  commit(types.SET_PLAYLIST, list) // 提交播放列表
  commit(types.SET_CURRENT_INDEX, index) // 当前播放音乐的索引
  commit(types.SET_FULL_SCREEN, true) // 是否显示播放器
  // commit(types.SET_PLAYING_STATE, true) // 播放状态
}
