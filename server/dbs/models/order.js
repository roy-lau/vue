const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  Order = new Schema({
    id: {
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
    },
    total: {
      type: Number,
      required: true
    },
    imgs: {
      type: Array,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    status: {
      type: Number,
      required: true
    },

  })


module.exports = mongoose.model('Order', Order)
