const mongoose = require('mongoose')

const Subscriber = new mongoose.Schema({
  
  email:{
type:String,

  }
})

module.exports = mongoose.model('Subscriber', Subscriber)