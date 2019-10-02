import * as types from './mutation-types'

// mutation 是同步函数
const matutaions = {
    [types.CREATE_TEBLE](state, table) { state.tableList.push(table) },
    [types.UPDATE_TEBLE](state, table) { state.tableList = table },
    // [types.SET_SEACH_PAGE_STATE](state, SeachPageState) { state.SeachPageState = SeachPageState },
}

export default matutaions