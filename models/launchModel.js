const mongoose = require('mongoose')

const LaunchSchema = new mongoose.Schema({
  pmx:{
    type:Number,
  },
  disrupt:{
    type:Number,
  },
  dframe:{
    type:Number,
  },
  coding_colab:{
    type:Number,
  },
  stratergy_strom:{
    type:Number,
  },
  gaming:{
    type:Number,
  },
  internfair:{
    type:Number,
  },
  nec:{
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

module.exports = mongoose.model('Launch', LaunchSchema)