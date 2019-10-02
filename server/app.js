const Koa = require('koa'),
    Router = require('koa-router'),
    bodyParser = require('koa-bodyparser'),
    cors = require('koa2-cors'),
    useRoute = require('./router');

const app = new Koa(),
    router = new Router({prefix: '/api'});

app
	.use(bodyParser())
	.use(cors())
    .use(router.routes())
    .use(router.allowedMethods())

useRoute(router)


app.listen(3005);