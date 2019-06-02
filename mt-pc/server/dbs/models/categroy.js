const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  Categroy = new Schema({
    city: {
      type: String
    },
    types: {
      type: Array,
      require: true
    },
    areas: {
      type: Array,
      require: true
    }
  })


module.exports = mongoose.model('Categroy', Categroy)
