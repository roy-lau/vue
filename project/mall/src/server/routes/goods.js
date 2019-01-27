const router = require('express')()

const mongoose = require('mongoose')
let goods = require('../models/goods')

// 连接 MongoDB 数据库
mongoose.connect('mongodb://139.199.99.154/mall',{useNewUrlParser:true})

mongoose.connection.on('connected', () => {
        console.log("数据库连接成功！")
    })
    .on('error', () => {
        console.log("数据库连接失败！")
    })
    .on('disconnected', () => {
        console.log("数据库连接断开！")
    })

// 查询商品列表数据
router.get('/list', (req, res, next) => {
    let page = parseInt(req.query.page),
        pageSize = parseInt(req.query.pageSize),
        priceLevel = req.query.priceLevel,
        sort = req.query.sort,
        skip = (page - 1) * pageSize,
        priceGt = '',
        priceLte = '',
        params = {}

    if (priceLevel !== 'all') {
        switch (priceLevel) {
            case '0':
                priceGt = 0;
                priceLte = 100;
                break;
            case '1':
                priceGt = 100;
                priceLte = 500;
                break;
            case '2':
                priceGt = 500;
                priceLte = 1000;
                break;
            case '3':
                priceGt = 1000;
                priceLte = 5000;
                break;
        }
        params = {
            salePrice: {
                $gt: priceGt,
                $lte: priceLte
            }
        }
    }
    // 查询数据
    let goodsModel = goods.find(params).skip(skip).limit(pageSize)
    // 数据排序
    goodsModel.sort({ 'salePrice': sort })
    // 返回数据
    goodsModel.exec((err, doc) => {
        if (err) {
            res.json({ status: 1, msg: err.message })
        } else {
            res.json({
                status: 0,
                msg: '',
                result: {
                    count: doc.length,
                    list: doc
                }
            })
        }
    })
})

// 加入购物车
router.post('/addCart', (req, res, next) => {
    let userId = '100000077',
        productId = req.body.productId,
        User = require('../models/users')
    // 根据用户id查找用户
    User.findOne({ userId: userId }, (userErr, userDoc) => {
        if (userErr) {
            res.json({ status: 1, msg: userErr.message })
        } else {
            // console.log("user userDoc:", userDoc)
            // 如果查找到用户
            if (userDoc) {
                let goodsItem = ''
                // 遍历购物车
                userDoc.cartList.forEach((item) => {
                    // 如果购物车里已经有这个商品，商品数量++
                    if (item.productId === productId) {
                        goodsItem = item
                        item.productNum++
                    }
                })
                if (goodsItem) {
                    // 将商品添加到数据库
                    userDoc.save((err, doc) => {
                        if (err) {
                            res.json({ status: 1, mag: err.message })
                        } else {
                            res.json({status: 0,msg: '',result: 'success'})
                        }
                    })
                } else {
                    // 根据商品id查找商品
                    goods.findOne({ productId: productId }, (goodsErr, goodsDoc) => {
                        if (goodsErr) {
                            res.json({ status: 1, msg: goodsErr.message })
                        } else {
                            if (goodsDoc) {
                                // 商品数量
                                goodsDoc.productNum = 1
                                goodsDoc.checked = 1
                                // 将商品加入到用户的购物车
                                userDoc.cartList.push(goodsDoc)
                                // 保存数据
                                userDoc.save((err, doc) => {
                                    if (err) {
                                        res.json({ status: 1, mag: err.message })
                                    } else {
                                        res.json({
                                            status: 0,
                                            msg: '',
                                            result: 'success'
                                        })
                                    }
                                })
                            }
                        }
                    })
                }
            }
        }
    })
})

module.exports = router