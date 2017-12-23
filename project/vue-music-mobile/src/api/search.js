import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'

export function getHotKey() {
  // https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1
  })
  return jsonp(url, data, options)
}
