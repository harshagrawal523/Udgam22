const mongoose = require('mongoose')

const PmxSchema = new mongoose.Schema({

  teamname: {
    type: String,
  
  },
  leadername: {
    type: String,
  
  },
  leaderemailID: {
    type: String,
  
  },
  leaderphone: {
    type: String,
  
  },
//   M1name: {
//     type: String,
  
//   },
//   M1emailID: {
//     type: String,
    
//   },
//   M1phone:{
// type:String,

//   },
  M2name: {
    type: String,
  
  },
  M2emailID: {
    type: String,
    
  },
//   M2phone:{
// type:String,

//   },
  M3name: {
    type: String,
  
  },
  M3emailID: {
    type: String,
    
  },
//   M3phone:{
// type:String,

//   },
  M4name: {
    type: String,
  
  },
  M4emailID: {
    type: String,
    
  },
//   M4phone:{
// type:String,

//   },
teamName:{
type:String,
    
},
havepart1: {
  type: String,

},
havepart2: {
  type: String,

},
havepart3: {
  type: String,

},
havepart4: {
  type: String,

},
formwhere: {
  type: String,

},
careffid:{
  type:String,
},
      
  
})

module.exports = mongoose.model('Pmx', PmxSchema)