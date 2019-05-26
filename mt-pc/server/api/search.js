const Router = require('koa-router'),
  axios = require('./utils/axios.js'),
  Poi = require('../dbs/models/poi.js')



// 路由前缀
let router = new Router({
  prefix: '/search'
})

const baseUrl = 'http://cp-tools.cn/search/'
// 获取签名网址 http://cp-tools.cn/sign

const sign = '25bbdf407126c81a03d35927a7ad2486' // '2212009'
// 备用： bbdde5819c3573b8ebf5250dfb0f6fa1   1253000
// 备用： 4b97728a2c9ce7128f8c2653c079b6e3   4433019

/**
 * 热门搜索
 * @param  {[type]} '/top' [description]
 * @param  {[type]} async  (ctx          [description]
 * @return {[type]}        [description]
 */
router.get('/top', async (ctx) => {

  // try {
  //   const top = await Poi.find({
  //     'name': new RegExp(ctx.query.input),
  //     city: ctx.query.city
  //   })
  //   ctx.body = {
  //     code: 0,
  //     msg: '获取成功！',
  //     data: top.map(item => {
  //       return {
  //         name: item.name,
  //         type: item.type
  //       }
  //     }),
  //     type: top.length ? top[0].type : ''
  //   }

  // } catch (err) {
  //   ctx.body = { code: -1, msg: '获取失败！' + err, }

  // }


  let {
    status,
    data: {
      top
    }
  } = await axios.get(baseUrl+'top', {
    params: {
      input: ctx.query.input,
      city: ctx.query.city,
      sign
    }
  })
  ctx.body = {
    code: 0,
    msg: '获取成功！',
    data: status === 200 ?
      top : []
  }

})

router.get('/hotPlace', async (ctx) => {

  let city = ctx.store ? ctx.store.geo.position.city : ctx.query.city
  // try {
  //   let result = await Poi.find({
  //     city
  //     // type: ctx.query.type || '景点'
  //   }).limit(10)

  //   ctx.body = {
  //     code: 0,
  //     msg: '获取成功！',
  //     data: result.map(item => {
  //       return {
  //         name: item.name,
  //         type: item.type
  //       }
  //     })
  //   }
  // } catch (e) {
  //   ctx.body = {
  //     code: -1,
  //     msg: '获取失败！' + err,
  //   }
  // }

  let {
    status,
    data: {
      result
    }
  } = await axios.get(baseUrl+'hotPlace', {
    params: {
      sign,
      city
    }
  })
  ctx.body = {
    code: 0,
    msg: '获取成功！',
    data: status === 200 ?
      result : []
  }
})

router.get('/resultsByKeywords', async (ctx) => {
  const { city, keyword } = ctx.query;
  let {
    status,
    data: {
      count,
      pois
    }
  } = await axios.get(baseUrl+'resultsByKeywords', {
    params: {
      city,
      keyword,
      sign
    }
  })
  ctx.body = {
    count: status === 200 ? count : 0,
    pois: status === 200 ? pois : []
  }
})

router.get('/products', async (ctx) => {
  let keyword = ctx.query.keyword || '旅游'
  let city = ctx.query.city || '北京'
  let {
    status,
    data: {
      product,
      more
    }
  } = await axios.get(baseUrl+'products', {
    params: {
      keyword,
      city,
      sign
    }
  })
  if (status === 200) {
    ctx.body = {
      product,
      more: ctx.isAuthenticated() ? more : [],
      login: ctx.isAuthenticated()
    }
  } else {
    ctx.body = {
      product: {},
      more: ctx.isAuthenticated() ? more : [],
      login: ctx.isAuthenticated()
    }
  }
})
module.exports = router
