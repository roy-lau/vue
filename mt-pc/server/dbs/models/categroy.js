const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  Categroy = new Schema({
    city: {
      type: String
    },
    types: {
      type: Array,
      required: true
    },
    areas: {
      type: Array,
      required: true
    }
  })


module.exports = mongoose.model('Categroy', Categroy)
