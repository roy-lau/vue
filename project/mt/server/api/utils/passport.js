const passport = require('passport'),
    LocalStrategy = require('passport-local'),
    UserModel = require('../../dbs/models/users.js')

passport.use(new LocalStrategy(async (username,password,done)=>{
    let where = {
        username
    };
    // 从 MongoDB 中查找此用户
    let result = await UserModel.findOne(where)

    // 判断是否有这个用户
    if(result!=null){
        // 判断数据库中的 password 和 传进来的 password 是否相同
        if(result.password === password){
            return done(null,result)
        }else{
            return done(null,false,'密码错误')
        }
    }else{
        return done(null,false,'用户不存在')
    }
}))

// 序列化（从session中读取）
passport.serializeUser((user,done) =>{
    done(null,user)
})

// 反序列化 （从session中读取）
passport.deserializeUser((user,done) =>{
    return done(null,user)
})

module.exports = passport