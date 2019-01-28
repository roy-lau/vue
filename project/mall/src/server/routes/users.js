const router = require('express')()

let Users = require('../models/users')


// 登陆
router.post('/login', (req, res, next) => {
    Users.findOne(req.body, (err, doc) => {
        if (err) {
            res.json({ status: 1, msg: err.message })
        } else {
            // console.log(req.body, 'doc>>>>>>',doc)
            // console.log(req.body, 'userId >>>>>>', doc.userId)
            if (doc) {
                res.cookie('userId', doc.userId, { path: '/', maxAge: 1000 * 60 * 60, httpOnly: true });
                res.cookie('userName', doc.userName, { path: '/', maxAge: 1000 * 60 * 60, httpOnly: true });
                // req.session.user = doc
                res.json({ status: 0, msg: '', result: { userName: doc.userName } })
            } else {
                res.json({ status: 1, msg: '账号不存在！' })
            }
        }
    })
})

// 登出
router.post('/logout', (req, res, next) => {
    res.cookie('userId', '', { path: '/', maxAge: -1 })
    res.json({ status: 0, msg: '', result: '登出成功！' })
})

// 登陆校验
router.post('/checkLogin', (req, res, next) => {
    if (req.cookies.userId) {
        res.json({ status: 0, msg: '', result: req.cookies.userName })
    }else{
        res.json({ status: 1, msg: 'checkLogin: 当前用户未登陆！', result: '' })
    }
})

module.exports = router