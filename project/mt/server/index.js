const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')


const mongoose = require('mongoose'),
  bodyParser = require('koa-bodyparser'),
  session = require('koa-generic-session'),
  redisStore = require('koa-redis'),
  json = require('koa-json'), 
  dbConfig = require('./dbs/config'),
  Passport = require('./api/utils/passport.js'),
  users = require('./api/users.js')

const app = new Koa()

// session 相关配置
app.keys = ['mt','shuibianxie']
app.proxy = true
app.use(
  session({
    key:'mt',
    prefix:'mt:uid',
    store:redisStore({
      host:dbConfig.redis.host,
      port:dbConfig.redis.prot
    })
  })
  )
// post类型接口处理 配置
app.use(bodyParser({
  extendTypes:['json','form','text']
}))

// 美化json
app.use(json())

// 连接数据库
mongoose.connect(dbConfig.uri,{useCreateIndex: true,useNewUrlParser:true})

app.use(Passport.initialize())
app.use(Passport.session())


// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // 引入所有 users的路由表
  app.use(users.routes()).use(users.allowedMethods())
  app.use(ctx => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
