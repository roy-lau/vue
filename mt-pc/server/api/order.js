const Router = require('koa-router'),
  axios = require('./utils/axios.js'),
  md5 = require('crypto-js/md5'),
  Cart = require('../dbs/models/cart.js'),
  Order = require('../dbs/models/order.js')



// 路由前缀
let router = new Router({ prefix: '/order' })

/**
 * 创建订单
 * @param  {[type]} ctx [description]
 * @return {[type]}     [description]
 */
router.post('/createOrder', async ctx => {
  if (!ctx.isAuthenticated()) {
    ctx.body = { code: -1, msg: '请登录！' }
  } else {
    let { id, price, count } = ctx.request.body,
      time = Date(),
      orderId = (Date.now() * Math.random()).toString(16).replace('.', '-'),
      findCart = await Cart.findOne({ cartNo: id })

      let order = new Order({
        id: orderId,
        count,
        total: price * count,
        time,
        user: ctx.session.passport.user,
        name: findCart.detail[0].name,
        imgs: findCart.detail[0].imgs,
        status: 0
      })

    try {
      let result = await order.save()

      if (result) {
        await findCart.remove()
        ctx.body = { code: 0, msg: 'ok', id: orderId }
      } else {
        ctx.body = { code: -1, msg: '创建订单失败！' }
      }
    } catch (e) {
      ctx.body = { code: -1, msg: e }
    }
  }
})

/**
 * 获取订单信息
 * @param  {[type]} ctx [description]
 * @return {[type]}     [description]
 */
router.post('/getOrders', async ctx => {
  if (!ctx.isAuthenticated()) {
    ctx.body = { code: -1, msg: '请登录！' }
  } else {
    try {
      let result = await Order.find()
      console.log('---',result)
      if (result) {
        ctx.body = { code: 0, list: result }
      } else {
        ctx.body = { code: 0, list: [], msg: "未查询到数据！" }
      }
    } catch (e) {
      ctx.body = { code: -1, list: [], msg: e }
    }
  }
})

module.exports = router
