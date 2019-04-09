const Router = require('koa-router'),
    Redis = require('koa-redis'),
    nodeMailer = require('nodemailer'),
    User = require('../dbs/models/users.js'),
    Passport = require('./utils/passport.js'),
    Email = require('../dbs/config.js'),
    axios = require('./utils/axios.js')


// 路由前缀
let router = new Router({
    prefix: '/users'
})

// Redis 客户端
let Store = new Redis().client

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
                ctx.body = {
                    code: -1,
                    msg: '验证码已过期，请重新尝试！'
                }
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
        let res = awiat axios.post('/users/signin', { username, password })

        if (res.data && res.data.code === 0) {
            ctx.body = {
                code: 0,
                msg: '注册成功！',
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
router.post('/singin', async (ctx,next) =>{
    return Passport.authenticate('local',(err,user,info,status)=>{
        if(err){
            ctx.body={code:-1,msg:err}
        }else{
            if(user){
                ctx.body = {code:0,msg:'登陆成功！',user}
                return ctx.login(user)
            }else{
                ctx.body = {code:1,msg:info}
            }
        }
    })(ctx,next)
})