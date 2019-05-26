const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  ProvinceSchema = new Schema({
    id: {
      type: String,
      unique: true,
      required: true
    },
    value: {
      type: Array,
      required: true
    }
  })


module.exports = mongoose.model('Province', ProvinceSchema)
