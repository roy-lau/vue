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
    } else {
        res.json({ status: 1, msg: 'checkLogin: 当前用户未登陆！', result: '' })
    }
})
// 查询当前用户的购物车数据
router.get('/cartList', (req, res, next) => {
    let userId = req.cookies.userId
    Users.findOne({ userId: userId }, (err, doc) => {
        if (err) {
            res.json({ status: 1, msg: err.message, result: '' })
        } else {
            if (doc) {
                res.json({ status: 0, msg: '', result: doc.cartList })
            }
        }
    })
})
// 删除购物车
router.post("/cart/del", (req, res, next) => {
    let userId = req.cookies.userId,
        productId = req.body.productId
    // 通过更新的方式删除
    Users.updateOne({ userId: userId }, { $pull: { cartList: { productId: productId } } }, (err, doc) => {
        if (err) {
            res.json({ status: 1, msg: err.message, result: '' })
        } else {
            res.json({ status: 0, msg: '删除成功', result: 'success' })
        }
    })
})
// 编辑购物车(修改商品数量)
router.post("/cart/edit", (req, res, next) => {
    let userId = req.cookies.userId,
        productId = req.body.productId,
        productNum = req.body.productNum,
        checked = req.body.checked

    Users.updateOne({ userId: userId, "cartList.productId": productId },
        { "cartList.$.checked": checked ,"cartList.$.productNum": productNum },
        (err, doc) => {
            if (err) {
                res.json({ status: 1, msg: err.message, result: '' })
            } else {
                res.json({ status: 0, msg: '', result: 'success' })
            }
        })
})

router.post("/cart/edit/checkAll",(req,res,next)=>{
    let userId = req.cookies.userId,
        checkAll = req.body.checkAll
    Users.findOne({userId:userId},(userErr,userDoc)=>{
        if (userErr) {
            res.json({status:1,msg:userErr.message,result:''})
        }else{
            if (userDoc) {
                userDoc.cartList.forEach(item =>{
                    item.checked = checkAll
                })
                userDoc.save((err,doc)=>{
                    if (err) {
                        res.json(status:1,msg:err.message,result:'')
                    }else{
                        res.json({status:0,msg:'',result:'success'})
                    }
                })
            }
        }
    })
})













module.exports = router