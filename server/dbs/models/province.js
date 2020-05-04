const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  ProvinceSchema = new Schema({
    id: {
      type: String,
      unique: true,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  })


module.exports = mongoose.model('Province', ProvinceSchema)
