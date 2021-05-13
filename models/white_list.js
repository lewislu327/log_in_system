const mongoose = require('mongoose')
const Schema = mongoose.Schema
const white_list_schema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
})

module.exports = mongoose.model('White_List', white_list_schema )