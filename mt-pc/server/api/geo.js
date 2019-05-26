const Router = require('koa-router'),
  axios = require('./utils/axios.js'),
  Province = require('../dbs/models/province.js')



// 路由前缀
let router = new Router({
  prefix: '/geo'
})

const baseUrl = 'http://cp-tools.cn/geo/'
// 获取签名网址 http://cp-tools.cn/sign

const sign = '25bbdf407126c81a03d35927a7ad2486' // '2212009'
// 备用： bbdde5819c3573b8ebf5250dfb0f6fa1   1253000
// 备用： 4b97728a2c9ce7128f8c2653c079b6e3   4433019

/**
 * 获取当前地址（城市）
 *
 * @param  {[type]} '/getPosition' [description]
 * @param  {[type]} async          (ctx          [description]
 * @return {[type]}                [description]
 */
router.get('/getPosition', async (ctx) => {

  let { status, data } = await axios.get(baseUrl + 'getPosition?sign=' + sign)

  if (status === 200) {
    ctx.body = { code: 0, msg: '获取成功！', data }
  } else {
    ctx.body = { code: 1, msg: '获取失败！', data }
  }

})
/**
 * 获取菜单
 *
 * @param  {[type]} '/menu' [description]
 * @param  {[type]} async   (ctx          [description]
 * @return {[type]}         [description]
 */
router.get('/menu', async (ctx) => {

  let { status, data } = await axios.get(baseUrl + 'menu?sign=' + sign)

  if (status === 200) {
    ctx.body = { code: 0, msg: '获取成功！', data: data.menu }
  } else {
    ctx.body = { code: 1, msg: '获取失败！', data }
  }

})

router.get('/province', async (ctx) => {

  const province = await Province.find()
  // if (status === 200) {
  //   ctx.body = { code: 0, msg: '获取成功！', data: data.menu }
  // } else {
  //   ctx.body = { code: 1, msg: '获取失败！', data }
  // }

})

module.exports = router
