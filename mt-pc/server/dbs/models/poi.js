const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  Poichema = new Schema({
    name: {
      type: String //景点名
    },
    province: {
      type: String
    },
    city: {
      type: String
    },
    county: {
      type: String
    },
    areaCode: {
      type: String
    },
    tel: {
      type: String
    },
    area: {
      type: String
    },
    addr: {
      type: String
    },
    type: {
      type: String
    },
    module: {
      type: String
    },
    longitude: {
      type: Number // 经度
    },
    latitude: {
      type: Number // 纬度
    }
  })


module.exports = mongoose.model('Poi', Poichema)
