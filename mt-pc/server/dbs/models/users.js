const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  UserSchema = new Schema({
    username: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  })


module.exports = mongoose.model('User', UserSchema)
