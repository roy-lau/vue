const mongoose = require("mongoose")
let Schema = mongoose.Schema

let usersSchema = new Schema({
    "userId": String,
    "userName": String,
    "userPwd": String,
    "orderList": Array,
    "cartList": [{
        "productId": String,
        "productName": String,
        "salePrice": String,
        "productImage": String,
        "productUrl": String,
        "checked": String,
        "productNum": String
    }],
    "addressList": [{
        "addressId": String,
        "userName": String,
        "steetName": String,
        "postCode": Number,
        "tel": Number,
        "isDefault": Boolean
    }]
})

module.exports = mongoose.model("User", usersSchema)