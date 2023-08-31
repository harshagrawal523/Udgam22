const mongoose = require('mongoose')

const ShmerchSchema = new mongoose.Schema({

    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone:{
        type: String,
    },
    size:{
        type: String,
    },
    Address1: {
        type: String,
    },
    Address2: {
        type: String,
    },
    city:{
        type: String,
    },
    state:{
        type: String,
    },
    pincode:{
        type: String,
    }
      
  
})

module.exports = mongoose.model('Shmerch', ShmerchSchema)