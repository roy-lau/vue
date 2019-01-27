const mongoose = require("mongoose")
let Schema = mongoose.Schema

let produtSchema = new Schema({
	"productId": {type: String},
	"productName": String,
	"salePrice": Number,
	"productImage":String,
	"productNum":Number
})

module.exports = mongoose.model("goods",produtSchema)