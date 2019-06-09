const Router = require('koa-router'),
  axios = require('./utils/axios.js'),
  md5 = require('crypto-js/md5'),
  Cart = require('../dbs/models/cart.js')



// 路由前缀
let router = new Router({
  prefix: '/cart'
})

/**
 * 创建订单
 * @param  {[type]} ctx [description]
 * @return {[type]}     [description]
 */
router.post('/create', async ctx => {
  if (!ctx.isAuthenticated()) {
    ctx.body = { code: -1, msg: '请登录！' }
  } else {
    let time = Date(),
      cartNo = (Date.now() * Math.random()).toString(16).replace('.', '-'),
      { id, detail } = ctx.request.body,
      cart = new Cart({ id, cartNo, time, user: ctx.session.passport.user, detail }),
      result = await cart.save()
    if (result) {
      ctx.body = { code: 0, msg: 'ok', id: cartNo }
    } else {
      ctx.body = { code: -1, msg: '创建订单失败！' }
    }
  }
})

/**
 * 获取购物车信息
 * @param  {[type]} ctx [description]
 * @return {[type]}     [description]
 */
router.post('/getCart', async ctx => {
  let { id } = ctx.request.body

  try {
    let result = await Cart.findOne({ cartNo: id })
    ctx.body = { code: 0, data: result ? result.detail[0] : {} }
  } catch (e) {
    ctx.body = { code: -1, data: {}, msg: e }
  }
})

module.exports = router
