const Router = require('koa-router'),
  axios = require('./utils/axios.js'),
  Province = require('../dbs/models/province.js'),
  City = require('../dbs/models/city.js')



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
    ctx.body = { code: -1, msg: '获取失败！', data }
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
    ctx.body = { code: -1, msg: '获取失败！', data }
  }

})
/**
 * 获取所有省份
 * @param  {[type]} '/province' [description]
 * @param  {[type]} async       (ctx          [description]
 * @return {[type]}             [description]
 */
router.get('/province', async (ctx) => {

  try {
    const province = await Province.find()
    ctx.body = { code: 0, msg: '获取成功！', data: province }

  } catch (err) {
    ctx.body = { code: -1, msg: '获取失败！', }

  }

})

/**
 * 根据省份id 获取城市
 *
 * @param  {[type]} '/province/:id' [description]
 * @param  {[type]} async           (ctx          [description]
 * @return {[type]}                 [description]
 */
router.get('/province/:id', async (ctx) => {

  try {
    const city = await City.findOne({ id: ctx.params.id })
    ctx.body = { code: 0, msg: '获取成功！', data: city }

  } catch (err) {
    ctx.body = { code: -1, msg: '获取失败！', }

  }

})
/**
 * 获取所有城市
 * @param  {[type]} '/city' [description]
 * @param  {[type]} async   (ctx          [description]
 * @return {[type]}         [description]
 */
router.get('/city', async (ctx) => {

  try {
    let city = [],
      result = await City.find()

    result.forEach(item => { city = city.concat(item.value) })

    ctx.body = {
      code: 0,
      msg: '获取成功！',
      data: city.map(item => {
        return {
          province: item.province,
          id: item.id,
          name: item.name === '市辖区' || item.name === '省直辖县级行政区划' ?
            item.province : item.name
        }
      })
    }


  } catch (err) {
    ctx.body = { code: -1, msg: '获取失败！' + err, }

  }

})

/**
 * 热门城市
 * @param  {[type]} '/hotCity' [description]
 * @param  {[type]} async      (ctx          [description]
 * @return {[type]}            [description]
 */
router.get('/hotCity', async (ctx) => {
  try {
    let list = [
        '北京市',
        '上海市',
        '广州市',
        '深圳市',
        '天津市',
        '西安市',
        '杭州市',
        '南京市',
        '武汉市',
        '成都市'
      ],
      nList = [],
      result = await City.find()

    result.forEach(item => {
      nList = nList.concat(item.value.filter(k => list.includes(k.name) || list.includes(k.province)))
    })

    ctx.body = {
      code: 0,
      msg: '获取成功！',
      data: nList
    }
  } catch (err) {
    ctx.body = { code: -1, msg: '获取失败！' + err, }

  }
})
module.exports = router
