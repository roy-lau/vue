const Router = require('koa-router'),
  Redis = require('koa-redis'),
  nodeMailer = require('nodemailer'),
  User = require('../dbs/models/users.js'),
  Passport = require('./utils/passport.js'),
  Configs = require('../dbs/config.js'),
  axios = require('./utils/axios.js')


// 路由前缀
let router = new Router({
  prefix: '/users'
})

// Redis 客户端
let Store = new Redis({
  host: Configs.redis.host,
  port: Configs.redis.prot
}).client

/**
 * 注册账号（邮箱）
 */
router.post('/singup', async ctx => {
  const {
    username,
    password,
    email,
    code
  } = ctx.request.body

  /** 验证 验证码 */
  if (code) {
    // 从 Redis 中获取 验证码和过期时间
    const saveCode = await Store.hget(`nodemail:${username}`, 'code'),
      saveExpire = await Store.hget(`nodemail:${username}`, 'expire')

    if (code === saveCode) {
      // 当前时间 - 过期时间 > 0 , 说明验证码已过期
      if (new Date().getTime() - saveExpire > 0) {
        ctx.body = { code: -1, msg: '验证码已过期，请重新尝试！' }
        return false
      }
    } else {
      ctx.body = { code: -1, msg: '请填写正确的验证码！' }
    }
  } else {
    ctx.body = { code: -1, msg: '请填写验证码！' }
  }

  /** 验证 用户名 */
  let user = await User.find({ username })

  if (user.length) {
    ctx.body = { code: -1, msg: '该账号已被注册！' }
    return
  }

  let newUser = await User.create({
    username,
    password,
    email
  })
  if (newUser) {
    let res = await axios.post('/users/singin', { username, password })

    if (res.data && res.data.code === 0) {
      ctx.body = {
        code: 0,
        msg: '恭喜您，注册成功！',
        user: res.data.user
      }
    } else {
      ctx.body = { code: -1, msg: 'post error' }
    }
  } else {
    ctx.body = { code: -1, msg: '注册失败！' }
  }

})

/**
 *  登陆
 */
router.post('/singin', async (ctx, next) => {
  return Passport.authenticate('local', (err, user, info, status) => {
    if (err) {
      ctx.body = { code: -1, msg: err }
    } else {
      if (user) {
        ctx.body = { code: 0, msg: '登录成功', user }
        return ctx.login(user)
      } else {
        ctx.body = { code: 1, msg: info }
      }
    }
  })(ctx, next)
})

/**
 * 发送邮箱验证码
 *
 * @param  {[type]} '/verify' [description]
 * @param  {[type]} async     (ctx,         next [description]
 * @return {[type]}           [description]
 */
router.post('/verify', async (ctx, next) => {
  let username = ctx.request.body.username

  try {
    // 获取过期时间
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')

    // 过期时间存在 且 当前时间减去过期时间大于0
    if (saveExpire && new Date().getTime() - (saveExpire / 10) < 0) {
      ctx.body = {
        code: -1,
        msg: '验证请求过于频繁！'
      }
      return false
    }
  } catch (err) {
    console.log('redis error >>> ', err)
  }

  // 创建发送邮件对象
  let transporter = nodeMailer.createTransport({
    host: Configs.smtp.host,
    port: 587,
    secure: false,
    auth: {
      user: Configs.smtp.user,
      pass: Configs.smtp.pass
    }
  })
  // 给谁发
  let ko = {
    code: Configs.smtp.code(),
    expire: Configs.smtp.expire(),
    email: ctx.request.body.email,
    user: ctx.request.body.username
  }
  // 发件内容
  let mailOptions = {
    from: `"认证邮件：" <${Configs.smtp.user}>`,
    to: ko.email,
    subject: '《美团网》注册码',
    html: `您在《美团网》中注册，您的邀请码是${ko.code}`
  }
  // 发送邮件
  await transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return console.log("sendMail ERR:" + err)
    } else {
      Store.hmset(`nodemail:${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email)
    }
  })
  ctx.body = { code: 0, msg: '验证码已发送，有效期1分钟！' }
})
/**
 * 退出登录
 * @param  {[type]} '/ext' [description]
 * @param  {[type]} async  (ctx,         next [description]
 * @return {[type]}        [description]
 */
router.get('/exit', async (ctx, next) => {
  await ctx.logout()
  // 检查是否是登陆状态
  if (!ctx.isAuthenticated()) {
    ctx.body = { code: 0, msg: '退出成功！' }
  } else {
    ctx.body = { code: -1, msg: '退出失败！' }
  }
})

router.get('/getUser', async ctx => {
  if (ctx.isAuthenticated()) {
    const { username, email } = ctx.session.passport.user
    ctx.body = { user: username, email }
  } else {
    ctx.body = { user: '', email: '' }
  }
})

module.exports = router
