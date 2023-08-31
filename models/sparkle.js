const mongoose = require('mongoose')

const SparkleSchema = new mongoose.Schema({

  name: {
    type: String,
  
  },
  emailID: {
    type: String,
  
  },
  phone: {
    type: String,
  
  },
  promo: {
    type: String,
  },
formwhere: {
  type: String,

},
careffid:{
  type:String,
},
      
  
})

module.exports = mongoose.model('Sparkle', SparkleSchema)