module.exports =  {
    // MongoDB 数据库地址
    uri: 'mongodb+srv://dev:toor@roylaudb-16ntu.mongodb.net/mt',
    redis:{
        get host(){
            return '139.199.99.154'
        },
        get port(){
            return 6379
        }
    },
    smtp: {
        // qq 邮箱主机
        get host() {
            return 'smtp.qq.com'
        },
        // qq 邮箱账号
        get user() {
            return '897379293@qq.com'
        },
        // qq 邮箱授权码
        get pass() {
            return 'hpxkkknnqlorbbah'
        }
    },
    // 邮箱验证码
    get code() {
        return () => {
            // 生成随机数，转换为16进制，从第二位截取到第六位，转换为大写
            return Math.random().toString(16).substr(2, 6).toUpperCase()
        }
    },
    // 验证码过期时间（一分钟）
    get expire(){
        return ()=>{
            return new Date().getTime() + 60 * 60 * 1000
        }
    }
}