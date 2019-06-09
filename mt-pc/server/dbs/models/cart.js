const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  Cart = new Schema({
    id: {
      type: String,
      required: true
    },
    detail: {
      type: Array,
      required: true
    },
    cartNo: {
      type: String,
      required: true
    },
    user: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    }
  })


module.exports = mongoose.model('Cart', Cart)
