const express = require('express')
const app = express()
const goods = require('./routes/goods')
const users = require('./routes/users')

// 部署前端vue项目
const path = require('path')
app.use(express.static(path.join(__dirname, 'dist')))


var bodyParser = require('body-parser'); //用于req.body获取值的
app.use(bodyParser.json());
// 创建 application/x-www-form-urlencoded 编码解析
app.use(bodyParser.urlencoded({ extended: true }));

const cookieParser = require('cookie-parser')
app.use(cookieParser())

//设置允许跨域访问该服务.
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', "PUT,POST,GET,DELETE,OPTIONS");
    res.header('Content-Type', 'application/json;charset=utf-8');
    res.header("Access-Control-Allow-Credentials", true); //带cookies7

    next();
});

app.use((req,res,next)=>{
	if (req.cookies.userId) {
		next()
	}else{
		let arr = ['/users/login','/users/logout','/goods/list']
		// console.log(req.path,arr.indexOf(req.path) > -1)
		if (arr.indexOf(req.path) > -1) {
			next()
		}else{
			res.json({status:'10001',msg:'当前用户未登录！',result:''})
		}
	}
})

app.get('/', (req, res) => res.send('Hello World!'))

app.use('/goods', goods)
app.use('/users', users)


app.listen(9092, () => console.log('mall 项目启动成功，http://139.199.99.154:9092'))