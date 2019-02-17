const router = require('express')()
require("../utils/dateFormat.js")
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

    Users.updateOne({ userId: userId, "cartList.productId": productId }, { "cartList.$.checked": checked, "cartList.$.productNum": productNum },
        (err, doc) => {
            if (err) {
                res.json({ status: 1, msg: err.message, result: '' })
            } else {
                res.json({ status: 0, msg: '', result: 'success' })
            }
        })
})

router.post("/cart/edit/checkAll", (req, res, next) => {
    let userId = req.cookies.userId,
        checkAll = req.body.checkAll
    Users.findOne({ userId: userId }, (userErr, userDoc) => {
        if (userErr) {
            res.json({ status: 1, msg: userErr.message, result: '' })
        } else {
            if (userDoc) {
                userDoc.cartList.forEach(item => {
                    item.checked = checkAll
                })
                userDoc.save((err, doc) => {
                    if (err) {
                        res.json({ status: 1, msg: err.message, result: '' })
                    } else {
                        res.json({ status: 0, msg: '', result: 'success' })
                    }
                })
            }
        }
    })
})


// 查询用户地址接口
router.get("/addressList", (req, res, next) => {
    let userId = req.cookies.userId
    Users.findOne({ userId: userId }, (err, doc) => {
        if (err) {
            res.json({ status: 1, msg: err.message, result: '' })
        } else {
            res.json({ status: 1, msg: '', result: doc.addressList })
        }
    })
})

// 设置用户默认地址
router.post("/setDefaultAddress", (req, res, next) => {
    let userId = req.cookies.userId,
        addressId = req.body.addressId

    if (!addressId) {
        res.json({ status: 110, msg: 'addressId is null', result: '' })
    }
    Users.findOne({ userId: userId }, (err, doc) => {
        if (err) {
            res.json({ status: 1, msg: err.message, result: '' })
        } else {
            let addressList = doc.addressList
            addressList.forEach(item => {
                if (item.addressId === addressId) {
                    item.isDefault = true
                } else {
                    item.isDefault = false
                }
            })
            doc.save((err1, doc1) => {
                if (err) {
                    res.json({ status: 1, msg: err1.message, result: '' })
                } else {
                    res.json({ status: 0, msg: '', result: 'save success' })
                }
            })
        }
    })
})

// 删除用户地址接口
router.post("/delAddress", (req, res, next) => {
    let userId = req.cookies.userId,
        addressId = req.body.addressId,
        orderTotal = req.body.orderTotal

    Users.updateOne({ userId: userId }, { $pull: { 'addressList': { addressId: addressId } } }, (err, doc) => {
        if (err) {
            res.json({ status: 1, msg: err.message, result: '' })
        } else {
            res.json({ status: 0, msg: '', result: 'del address success' })
        }
    })
})

// 支付 生成订单
router.post("/payMent", (req, res, next) => {
    let userId = req.cookies.userId,
        addressId = req.body.addressId,
        orderTotal = req.body.orderTotal
    Users.findOne({ userId: userId }, (userErr, userDoc) => {
        if (userErr) {
            res.json({ status: 1, msg: userErr.message, result: '' })
        } else {
            let address = null,
                goodsList = []
            // 获取当前用户的地址信息
            userDoc.addressList.forEach(item => {
                if (addressId === item.addressId) {
                    address = item
                }
            })
            // 获取用户购物车的购买商品
            userDoc.cartList.filter(item => {
                if (item.checked === '1') {
                    goodsList.push(item)
                }
            })

            // 0到9之间的随机数
            let r1 = Math.floor(Math.random() * 10),
                r2 = Math.floor(Math.random() * 10),
                // 系统时间
                sysDate = new Date().Format('yyyyMMddhhmmss'),
                // 订单的创建时间
                createDate = new Date().Format('yyyy-MM-dd hh:mm:ss'),
                // 平台代码（随便写的）
                platform = '110',
                // 生成订单id(21位)
                orderId = platform + r1 + sysDate + r2

            // 订单信息
            const ORDER = {
                orderId: orderId,
                orderTotal: orderTotal,
                addressInfo: address,
                goodsList: goodsList,
                orderStatus: 1,
                createDate: createDate
            }
            // 保存订单列表
            userDoc.orderList.push(ORDER)
            userDoc.save((err, doc) => {
                if (userErr) {
                    res.json({ status: 1, msg: userErr.message, result: '' })
                } else {
                    res.json({
                        status: 0,
                        msg: 'payMent success',
                        result: { orderId: ORDER.orderId, orderTotal: ORDER.orderTotal }
                    })
                }
            })
        }
    })
})

// 根据订单id查询订单信息
router.get("/orderDetail", (req, res, next) => {
    let userId = req.cookies.userId,
        orderId = req.query.orderId

    Users.findOne({ userId: userId }, (userErr, userDoc) => {
        if (userErr) {
            res.json({ status: 1, msg: userErr.message, result: '' })
        } else {
            let orderList = userDoc.orderList
            if (orderList.length > 0) {
                let orderTotal = 0
                orderList.forEach(item => {
                    if (item.orderId = orderId) {
                        orderTotal = item.orderTotal
                    }
                })
                if (orderTotal > 0) {
                    res.json({ status: 0, msg: 'success', result: { orderId: orderId, orderTotal: orderTotal } })
                } else {
                    res.json({ status: 120, msg: `没有此订单(${orderTotal})!`, result: '' })
                }
            } else {
                res.json({ status: 120, msg: '当前用户未创建订单!', result: '' })

            }
        }
    })
})





module.exports = router