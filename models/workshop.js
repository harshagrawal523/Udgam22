const mongoose = require('mongoose')

const WorkshopSchema = new mongoose.Schema({

    workname: {
        type: String,
      
      },
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

module.exports = mongoose.model('Workshop', WorkshopSchema)