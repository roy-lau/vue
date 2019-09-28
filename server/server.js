const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();
const history = require('connect-history-api-fallback'); // 使 express 可以支持 spa 不带 # 的情况
app.use(history())      // 这里千万要注意，要在static静态资源上面

// 引入users.js
const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');

// DB config
const db = require('./config/keys').mongoURI;

// 使用body-parser中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to mongodb
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// passport 初始化
app.use(passport.initialize());

require('./config/passport')(passport);

// app.get("/",(req,res) => {
//   res.send("Hello World!");
// })

// 使用routes
app.use('/api/users', users);
app.use('/api/profiles', profiles);


// 部署前端vue项目
const path = require('path')
app.use(express.static(path.join(__dirname, 'dist')))


const port = process.env.PORT || 3003;

app.listen(port, () => {
  console.log(`资金后台项目启动，端口： ${port}`);
});
