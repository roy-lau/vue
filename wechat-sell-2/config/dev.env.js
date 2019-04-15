'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API: '"//whx.wenqiyun.com"',
  openidUrl: '"//whx.wenqiyun.com/sell/wechat/authorize"',
  wechatPayUrl: '"//whx.wenqiyun.com/sell/pay/create"'
})
