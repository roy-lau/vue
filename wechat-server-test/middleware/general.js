const koaBody = require('koa-bodyparser'),
    session = require('koa-session')

module.exports = app => {
    return async function(ctx, next) {

        app.use(koaBody())


        app.keys = ['got']
        const CONFIG = {
            key: 'koa:sess',
            maxAge: 86400000,
            overwrite: true,
            signed: true,
            rolling: false,
        }
        app.use(session(CONFIG, app))


        await next()
    }
}