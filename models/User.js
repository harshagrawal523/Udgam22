const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
  
  },
  displayName: {
    type: String,
    
  },
  email:{
type:String,

  },
  password:{
    type:String,
    
      },
      
  upass:{
        type:Number,
        
        },
  uid:{
    type:String,
  },
  upassid:{
    type:String,
  },
  w1:{
    type:String,
  },
  w2:{
    type:String,
  },
  w3:{
    type:String,
  },
  w4:{
    type:String,
  },
  w5:{
    type:String,
  },

  pmx:{
    type:Number,
  },
  encode:{
    type:Number,
  },

  disrupt:{
    type:Number,
  },
  dframe:{
    type:Number,
  },
  nec:{
    type:Number,
  },
  coding_collab:{
    type:Number,
  },
  strategy_storm:{
    type:Number,
  },
  gaming:{
    type:Number,
  },
  ama:{
    type:Number,
  },
  fe:{
    type:Number,
  },
  encode:{
    type:Number,
  },
  cosmic:{
    type:Number,
  },
  sparkle:{
    type:Number,
  },
  ls:{
    type:Number,
  },
  pd:{
    type:Number,
  },
  workshop:{
    type:Number,
  },
  internfair:{
    type:Number,
  },

  college:{
    type:String,
  },
  pkey:{
    type:String,
  },
  careffid:{
    type:String,
  },
  workshop1:{
    type:Number,
  },
  workshop2:{
    type:Number,
  },
  workshop3:{
    type:Number,
  },
  workshop4:{
    type:Number,
  },  
 
  

})

module.exports = mongoose.model('User', UserSchema)