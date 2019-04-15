const koa = require('koa');
const app = new koa();
const wechat = require('./middleware/wechat.js')
const config = require('./config/wechat.js')


app.use(wechat())


app.listen(3000, () => {
    console.info("服务已启动 》》 http://127.0.0.1:" + 3000)
});