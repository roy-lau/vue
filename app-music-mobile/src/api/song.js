import { commonParams } from './config'
import axios from 'axios'

export function getLyric(mid) {
  // const url = '/api/lyric' 本地路径
  const url = 'http://101.201.101.70:6962/api/lyric' // 服务器路径

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    pcachetime: +new Date(),
    platform: 'yqq',
    g_tk: 424033393,
    hostUin: 0,
    needNewCode: 0,
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
