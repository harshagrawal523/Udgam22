const router = require('express').Router()
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Subscriber = require('../models/subscribers');
const LaunchDetail = require('../models/launchModel');
const Pmx = require('../models/pmx');
const Encode = require('../models/encode');
const Disrupt = require('../models/disrupt');
const Workshop = require('../models/workshop');
const Shmerch = require('../models/shmerch');
const Sparkle = require('../models/sparkle');
const CC = require("../models/codingcollab");
const SS = require("../models/strategystorm");
const Gaming = require("../models/gaming");
const genuid = require('generate-unique-id');
const User_f = require("../f_config");
const Razorpay = require('razorpay');
var nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const fs = require('fs')
const path = require('path')
const handlebars = require('handlebars')



dotenv.config({ path: './config/config.env' })

var transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
  auth: {
    user: process.env.OEMAIL,
    pass: process.env.OPASS
  },
  from : process.env.OEMAIL,
});
//importing middleware
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const razorpay = new Razorpay({
    key_id:process.env.RAZORPAY_ID,
    key_secret:process.env.RAZORPAY_SECRET,
})

router.get('/' ,(req, res) => {
    
    const id1 = '61b0e7f46922abd65fd17812';
    LaunchDetail.findById(id1).then((data)=>{
        res.render('index',{userinfo:req.user , data});
    }).catch((err)=>{
        console.log(err);
    })
  })

router.get("/log", async(req,res)=>{
    const id1 = '61b0e7f46922abd65fd17812';
    LaunchDetail.findById(id1).then((data)=>{
        res.render('index',{userinfo:req.user , data});
    }).catch((err)=>{
        console.log(err);
    })
})

router.get("/login", ensureGuest, async(req,res)=>{
    res.render('login',{errdata:0,userinfo:req.user});
})

router.get('/register', ensureGuest, (req, res) => res.render('register',{errdata:0,msg:"",userinfo:req.user}));

router.post('/register',(req,res)=>{
  const {name,email, password, password2,college} = req.body;
  let uidarr=email.split("@");
  let uid=uidarr[0];
  const id = genuid({
    length: 4,
    useLetters: false
  });
  let upass = uid + "" + id + "@udgam-pass";
  uid+=id+"@udgam";
  
  


  let errors = [];
  console.log(' Name ' + name+ ' email :' + email+ ' pass:' + password);
  if(!name || !email || !password || !password2) {
      errors.push({msg : "Please fill in all fields"})
  }
  //check if match
  if(password !== password2) {
      errors.push({msg : "passwords don't match"});
  }
  
  //check if password is more than 6 characters
  if(password.length < 6 ) {
      errors.push({msg : 'password atleast 6 characters'})
  }
  if(errors.length > 0 ) {
    console.log(errors);
  res.render('register', {
     errdata:1,msg:"Password must be 6 characters long and password must be equal to confirm password",userinfo:req.user})
   } else {
      //validation passed
     User.findOne({email : email}).exec((err,user)=>{
      console.log(user);   
      if(user) {
          errors.push({msg: 'email already registered'});
          res.render('register',{errdata:1,msg:"Email already registered",userinfo:req.user})  
         } else {
          const newUser = new User({
            googleId : "",  
            displayName : name,
              email : email,
              password : password,
              upass:0,
              uid: uid,
              upassid: upass,
              w1:0,
              w2:0,
              w3:0,
              w4:0,
              w5:0,
              pmx:0,
              disrupt:0,
              dframe:0,
              fe:0,
              workshop:0,
              pd:0,
              ls:0,
              ama:0,
              nec:0,
              sparkle:0,
              encode:0,
              cosmic:0,
              coding_collab:0,
              strategy_storm:0,
              gaming:0,
              workshop1:0,
              workshop2:0,
              workshop3:0,
              workshop4:0,
              internfair:0,
          college:college,
          pkey:"",
          });
  
          //hash password
          bcrypt.genSalt(10,(err,salt)=> 
          bcrypt.hash(newUser.password,salt,
              (err,hash)=> {
                  if(err) throw err;
                      //save pass to hash
                      newUser.password = hash;
                  //save user
                  newUser.save()
                  .then((value)=>{
                     
                    
                      res.redirect(307,'/auth/login_m');
                  })
                  .catch(value=> console.log(value));
                    
              }));
           }
     })
  }

})



router.get("/landingpage", async(req,res)=>{
    res.render('landingpage',{userinfo:req.user})
})

router.get("/islogispass", async(req,res)=>{
        res.render('islogispass',{userinfo:req.user})
})

router.get("/workshop_pass_info", async(req,res)=>{
    res.render('workshop_pass_info',{userinfo:req.user})
})

router.get("/workshops/startup", async(req,res)=>{
    
    const id1 = '61b0e7f46922abd65fd17812';
    LaunchDetail.findById(id1).then((data)=>{
        res.render('workshop_startup',{userinfo:req.user , data});
    }).catch((err)=>{
        console.log(err);
    })
})

router.get("/workshops/marketing", async(req,res)=>{
    
    const id1 = '61b0e7f46922abd65fd17812';
    LaunchDetail.findById(id1).then((data)=>{
        res.render('workshop_marketing',{userinfo:req.user , data});
    }).catch((err)=>{
        console.log(err);
    })
})

router.get("/workshops/stock", async(req,res)=>{
    
    const id1 = '61b0e7f46922abd65fd17812';
    LaunchDetail.findById(id1).then((data)=>{
        res.render('workshop_stock',{userinfo:req.user , data});
    }).catch((err)=>{
        console.log(err);
    })
})

router.get("/events/sparkle", async(req,res)=>{
    
    const id1 = '61b0e7f46922abd65fd17812';
    LaunchDetail.findById(id1).then((data)=>{
        res.render('sparkle',{userinfo:req.user , data});
    }).catch((err)=>{
        console.log(err);
    })
})

router.get("/workshop-startup/register", ensureAuth, async(req,res)=>{
    const id1 = '61b0e7f46922abd65fd17812';
    
    LaunchDetail.findById(id1).then((data)=>{
        res.render('workshop_startup_register',{userinfo:req.user , data,flag:0, correct:0});
    }).catch((err)=>{
        console.log(err);
    })
})

router.get("/workshop-marketing/register", ensureAuth, async(req,res)=>{
    const id1 = '61b0e7f46922abd65fd17812';
    
    LaunchDetail.findById(id1).then((data)=>{
        res.render('workshop_marketing_register',{userinfo:req.user , data,flag:0, correct:0});
    }).catch((err)=>{
        console.log(err);
    })
})

router.get("/workshop-stock/register", ensureAuth, async(req,res)=>{
    const id1 = '61b0e7f46922abd65fd17812';
    
    LaunchDetail.findById(id1).then((data)=>{
        res.render('workshop_stock_register',{userinfo:req.user , data,flag:0, correct:0});
    }).catch((err)=>{
        console.log(err);
    })
})

router.get("/scavenger_hunt", async(req,res)=>{
    const id1 = '61b0e7f46922abd65fd17812';
    
    LaunchDetail.findById(id1).then((data)=>{
        res.render('scavenger_hunt',{userinfo:req.user , data,flag:0, correct:0});
    }).catch((err)=>{
        console.log(err);
    })
})

router.get("/sparkle/register", ensureAuth, async(req,res)=>{
    const id1 = '61b0e7f46922abd65fd17812';
    
    LaunchDetail.findById(id1).then((data)=>{
        res.render('sparkle_register',{userinfo:req.user , data,flag:0, correct:0});
    }).catch((err)=>{
        console.log(err);
    })
})


router.post("/apply_code_1", ensureAuth ,async(req,res)=>{

    var code = req.body.code;

    User.findOneAndUpdate(
        {email:req.user.email},{w1:code.toUpperCase()}
    ).then((data) => {
        var correct =0;
        if(code.toUpperCase()=="FIRST100"){
            correct=1;
        }
        const id1 = '61b0e7f46922abd65fd17812';
        LaunchDetail.findById(id1).then((data)=>{
            res.render('workshop_startup_register',{userinfo:req.user , data,flag:1, correct: correct});
        }).catch((err)=>{
            console.log(err);
        })
        

    }).catch((err) => {
        console.log(err);
    })

   
})


router.post("/apply_code_2", ensureAuth ,async(req,res)=>{

    var code = req.body.code;

    User.findOneAndUpdate(
        {email:req.user.email},{w2:code.toUpperCase()}
    ).then((data) => {
        var correct =0;
        if(code.toUpperCase()=="FIRST100"){
            correct=1;
        }
        const id1 = '61b0e7f46922abd65fd17812';
        LaunchDetail.findById(id1).then((data)=>{
            res.render('workshop_stock_register',{userinfo:req.user , data,flag:1, correct: correct});
        }).catch((err)=>{
            console.log(err);
        })
        

    }).catch((err) => {
        console.log(err);
    })

   
})

router.post("/apply_code_3", ensureAuth ,async(req,res)=>{

    var code = req.body.code;

    User.findOneAndUpdate(
        {email:req.user.email},{w3:code.toUpperCase()}
    ).then((data) => {
        var correct =0;
        if(code.toUpperCase()=="FIRST100"){
            correct=1;
        }
        const id1 = '61b0e7f46922abd65fd17812';
        LaunchDetail.findById(id1).then((data)=>{
            res.render('workshop_marketing_register',{userinfo:req.user , data,flag:1, correct: correct});
        }).catch((err)=>{
            console.log(err);
        })
        

    }).catch((err) => {
        console.log(err);
    })

   
})


// router.post('/workshop-startup',ensureAuth ,(req,res)=>{
//     var mamount = 0;
//     User.findOneAndUpdate(
//     {email : req.user.email} , 
//     {workshop1:1}
// ).then((data)=>{
//     if(user.w1.toUpperCase() == 'EARLYBIRD'){
//         mamount = 100;
//         user.w1="";
//     }else{
//         mamount = 0;
//     }


//     var userDetail ={
//         username:"testing",
//     }
//     var options = {
//         amount: 599 *100 - mamount*100,  // amount in the smallest currency unit
//         currency: "INR"
//         };
//         razorpay.orders.create(options, function(err, order) {
//         var createresObj ={
//             order:order,
//             userdetail:userDetail
//         }
//         res.json(createresObj);
//         });

//     // var emailid = req.user.email;
    
//     // const {workname,name,phone,formwhere,careffid} = req.body;
  
           

            
//     //         const newWorkshop = new Workshop({
                
//     //             workname:workname,
//     //             name: name,
//     //             emailID: emailid,
//     //             phone: phone,
               
//     //             formwhere: formwhere,
//     //             careffid: careffid,
             
               
                
  
//     //         });
            
//     //         newWorkshop.save()
//     //               .then((value)=>{
//     //                 var mamount = 0;
//     //                     User.findOneAndUpdate(
//     //                     {email : req.user.email} , 
//     //                     {workshop1:1}
//     //                 ).then((data)=>{
//     //                     if(user.w1.toUpperCase() == 'EARLYBIRD'){
//     //                         mamount = 100;
//     //                         user.w1="";
//     //                     }else{
//     //                         mamount = 0;
//     //                     }
            
            
//     //                     var userDetail ={
//     //                         username:"testing",
//     //                     }
//     //                     var options = {
//     //                         amount: 599 *100 - mamount*100,  // amount in the smallest currency unit
//     //                         currency: "INR"
//     //                       };
//     //                       razorpay.orders.create(options, function(err, order) {
//     //                         var createresObj ={
//     //                             order:order,
//     //                             userdetail:userDetail
//     //                         }
//     //                         res.json(createresObj);
//     //                       });
                        
//     //                     transporter.sendMail({

//     //                         from:process.env.OEMAIL,
//     //                         to:emailid,
//     //                         subject:'Your are registered for Creating & Funding Start-Up Workshop',
//     //                         html:'You are registered for Creating & Funding Start-Up Workshop',
//     //                         // text:'Your password reset<br> secret key',
                
//     //                     }, function(error, info){
//     //                         if (error) {
//     //                           console.log(error);
//     //                           res.redirect('/dashboard');
//     //                         } else {
//     //                            console.log("done");
//     //                         }
//     //                       });

                        
//     //                 }).catch((err)=>{
//     //                     console.log(err);
//     //                     res.redirect('err.ejs');
//     //                 })
//     //               }).catch(value=> console.log(value));
                  
                


// })


router.post('/workshop-temp',ensureAuth ,(req,res)=>{

    var emailid = req.user.email;
    
    const {workname,name,phone,formwhere,careffid} = req.body;
    console.log({workname,name,phone,formwhere,careffid});
           

            
            const newWorkshop = new Workshop({
                
                workname:workname,
                name: req.user.displayName,
                emailID: emailid,
                phone: phone,
                formwhere: formwhere,
                careffid: careffid,
             
               
                
  
            });
            
            newWorkshop.save()
                  .then((value)=>{
                    var mamount = 0;
                        User.findOneAndUpdate(
                        {email : req.user.email} , 
                        {workshop1:1}
                    ).then((data)=>{

                        const filePath = path.join(__dirname, '../public/event.html');
                        const source = fs.readFileSync(filePath, 'utf-8').toString();
                        const template = handlebars.compile(source);
                        const replacements = {
                            name: req.user.displayName,
                            event: "Workshop: "+ workname,
                        };
                        const htmlToSend = template(replacements);
                        transporter.sendMail({

                            from:process.env.OEMAIL,
                            to:req.user.email,
                            subject:'Your are registered for Workshop: '+workname,
                            html:htmlToSend
                        }, function(error, info){
                            if (error) {
                              console.log(error);
                              res.redirect('/dashboard');
                            } else {
                                res.render('confirmation',{title:"Congratulation!",msg:"You are registered for "+workname});
                            }
                          });

                        
                    }).catch((err)=>{
                        console.log(err);
                        res.redirect('err.ejs');
                    })
                  }).catch(value=> console.log(value));
                  
                


})


router.post('/workshop2-temp',ensureAuth ,(req,res)=>{

    var emailid = req.user.email;
    
    const {workname,name,phone,formwhere,careffid} = req.body;
    console.log({workname,name,phone,formwhere,careffid});
           

            
            const newWorkshop = new Workshop({
                
                workname:workname,
                name: req.user.displayName,
                emailID: emailid,
                phone: phone,
                formwhere: formwhere,
                careffid: careffid,
             
               
                
  
            });
            
            newWorkshop.save()
                  .then((value)=>{
                    var mamount = 0;
                        User.findOneAndUpdate(
                        {email : req.user.email} , 
                        {workshop2:1}
                    ).then((data)=>{

                        const filePath = path.join(__dirname, '../public/event.html');
                        const source = fs.readFileSync(filePath, 'utf-8').toString();
                        const template = handlebars.compile(source);
                        const replacements = {
                            name: req.user.displayName,
                            event: "Workshop: "+ workname,
                        };
                        const htmlToSend = template(replacements);
                        transporter.sendMail({

                            from:process.env.OEMAIL,
                            to:req.user.email,
                            subject:'Your are registered for Workshop: '+workname,
                            html:htmlToSend
                        }, function(error, info){
                            if (error) {
                              console.log(error);
                              res.redirect('/dashboard');
                            } else {
                                res.render('confirmation',{title:"Congratulation!",msg:"You are registered for "+workname});
                            }
                          });

                        
                    }).catch((err)=>{
                        console.log(err);
                        res.redirect('err.ejs');
                    })
                  }).catch(value=> console.log(value));
                  
                


})

router.post('/workshop3-temp',ensureAuth ,(req,res)=>{

    var emailid = req.user.email;
    
    const {workname,name,phone,formwhere,careffid} = req.body;
    console.log({workname,name,phone,formwhere,careffid});
           

            
            const newWorkshop = new Workshop({
                
                workname:workname,
                name: req.user.displayName,
                emailID: emailid,
                phone: phone,
                formwhere: formwhere,
                careffid: careffid,
             
               
                
  
            });
            
            newWorkshop.save()
                  .then((value)=>{
                    var mamount = 0;
                        User.findOneAndUpdate(
                        {email : req.user.email} , 
                        {workshop3:1}
                    ).then((data)=>{

                        const filePath = path.join(__dirname, '../public/event.html');
                        const source = fs.readFileSync(filePath, 'utf-8').toString();
                        const template = handlebars.compile(source);
                        const replacements = {
                            name: req.user.displayName,
                            event: "Workshop: "+ workname,
                        };
                        const htmlToSend = template(replacements);
                        transporter.sendMail({

                            from:process.env.OEMAIL,
                            to:req.user.email,
                            subject:'Your are registered for Workshop: '+workname,
                            html:htmlToSend
                        }, function(error, info){
                            if (error) {
                              console.log(error);
                              res.redirect('/dashboard');
                            } else {
                                res.render('confirmation',{title:"Congratulation!",msg:"You are registered for "+workname});
                            }
                          });

                        
                    }).catch((err)=>{
                        console.log(err);
                        res.redirect('err.ejs');
                    })
                  }).catch(value=> console.log(value));
                  
                


})


router.post('/sh-temp' ,(req,res)=>{

    const {name,email,phone,size, Address1,Address2,city,state,pincode} = req.body;
    console.log({name,email,phone,Address1,Address2,city,state,pincode});
           

            
            const newShmerch = new Shmerch({
                name: name,
                email: email,
                phone:phone,
                size:size,
                Address1: Address1,
                Address2: Address2,
                city:city,
                state:state,
                pincode:pincode
            });
            
            newShmerch.save()
                  .then((value)=>{
                    res.render('confirmation',{title:"Congratulation!",msg:"Your Scavenger Hunt Merchandise order has been placed successfully. Your order will be mapped with payment confirmation"});


                        
                    }).catch((err)=>{
                        console.log(err);
                        res.redirect('err.ejs');
                    })
                  
                


})


router.post('/sparkle-temp',ensureAuth ,(req,res)=>{

    var emailid = req.user.email;
    
    const {name,phone,formwhere,careffid} = req.body;
    console.log({name,phone,formwhere,careffid});
           

            
            const newSparkle = new Sparkle({
                name: req.user.displayName,
                emailID: emailid,
                phone: phone,
                formwhere: formwhere,
                careffid: careffid,
             
               
                
  
            });
            
            newSparkle.save()
                  .then((value)=>{
                    var mamount = 0;
                        User.findOneAndUpdate(
                        {email : req.user.email} , 
                        {sparkle:1}
                    ).then((data)=>{

                        const filePath = path.join(__dirname, '../public/event.html');
                        const source = fs.readFileSync(filePath, 'utf-8').toString();
                        const template = handlebars.compile(source);
                        const replacements = {
                            name: req.user.displayName,
                            event: "Sparkle"
                        };
                        const htmlToSend = template(replacements);
                        transporter.sendMail({

                            from:process.env.OEMAIL,
                            to:req.user.email,
                            subject:'Your are registered for Sparkle',
                            html:htmlToSend
                        }, function(error, info){
                            if (error) {
                              console.log(error);
                              res.redirect('/dashboard');
                            } else {
                                res.render('confirmation',{title:"Congratulation!",msg:"You are registered for Sparkle"});
                            }
                          });

                        
                    }).catch((err)=>{
                        console.log(err);
                        res.redirect('err.ejs');
                    })
                  }).catch(value=> console.log(value));
                  
                


})
    
////Workshops

router.get("/workshop_pass_buy_1", ensureAuth ,async(req,res)=>{
    res.render('old/workshop_pass_buy_1',{userinfo:req.user , flag : 0})
})




router.post('/order', async(req,res)=>{

        var mamount = 0;
        const {workname,name,phone,formwhere,careffid} = req.body;
        console.log({workname,name,phone,formwhere,careffid})
        console.log(workname)
       User.findOne({email:req.user.email})
        .then((user) => {

            if(user.w1.toUpperCase() == 'FIRST100'){
                mamount = 100;
                user.w1="";
            }else{
                mamount = 0;
            }


            var userDetail ={
                username:"testing",
            }
            var options = {
                amount: 599 *100 - mamount*100,  // amount in the smallest currency unit
                currency: "INR"
              };
              razorpay.orders.create(options, function(err, order) {
                var createresObj ={
                    order:order,
                    userdetail:userDetail
                }
                res.json(createresObj);
              });

        }).catch((err) => {
            console.log(err);
        })
        
   
});

router.post('/order-stock', async(req,res)=>{

    var mamount = 0;
    const {workname,name,phone,formwhere,careffid} = req.body;
    console.log({workname,name,phone,formwhere,careffid})
    console.log(workname)
   User.findOne({email:req.user.email})
    .then((user) => {

        if(user.w2.toUpperCase() == 'FIRST100'){
            mamount = 100;
            user.w2="";
        }else{
            mamount = 0;
        }


        var userDetail ={
            username:"testing",
        }
        var options = {
            amount: 499 *100 - mamount*100,  // amount in the smallest currency unit
            currency: "INR"
          };
          razorpay.orders.create(options, function(err, order) {
            var createresObj ={
                order:order,
                userdetail:userDetail
            }
            res.json(createresObj);
          });

    }).catch((err) => {
        console.log(err);
    })
    

});


router.post('/order-marketing', async(req,res)=>{

    var mamount = 0;
    const {workname,name,phone,formwhere,careffid} = req.body;
    console.log({workname,name,phone,formwhere,careffid})
    console.log(workname)
   User.findOne({email:req.user.email})
    .then((user) => {

        if(user.w3.toUpperCase() == 'FIRST100'){
            mamount = 100;
            user.w3="";
        }else{
            mamount = 0;
        }


        var userDetail ={
            username:"testing",
        }
        var options = {
            amount: 499 *100 - mamount*100,  // amount in the smallest currency unit
            currency: "INR"
          };
          razorpay.orders.create(options, function(err, order) {
            var createresObj ={
                order:order,
                userdetail:userDetail
            }
            res.json(createresObj);
          });

    }).catch((err) => {
        console.log(err);
    })
    

});

router.post('/order_sh', async(req,res)=>{

    var mamount = 0;
    var userDetail ={
        username:"testing",
    }
    var options = {
    amount: 420 *100 - mamount*100,  // amount in the smallest currency unit
    currency: "INR"
    };
    razorpay.orders.create(options, function(err, order) {
    var createresObj ={
        order:order,
        userdetail:userDetail
    }
    res.json(createresObj);
    });


});

router.post('/order_sparkle', async(req,res)=>{

    var mamount = 0;

   User.findOne({email:req.user.email})
    .then((user) => {



        var userDetail ={
            username:"testing",
        }
        var options = {
            amount: 199 *100,  // amount in the smallest currency unit
            currency: "INR"
          };
          razorpay.orders.create(options, function(err, order) {
            var createresObj ={
                order:order,
                userdetail:userDetail
            }
            res.json(createresObj);
          });

    }).catch((err) => {
        console.log(err);
    })

});

router.post('/order-verify/:username',(req,res)=>{
    console.log("req.params",req.params.username);
    console.log("req.body",req.body)
    res.send("Payment successfull")
    res.render('confirmation' , {title:"Done" , msg:"You are registered successfully"})
})




//////////////////////////////////////////////////////////


//////////////Gaming/////////////////////

router.get("/gaming", async(req,res)=>{
    res.render('gamingform',{userinfo:req.user});
}) 

router.post('/gaming',(req,res)=>{
    const {teamName,mem1name,mem1email, mem1clg, mem2name,mem2email, mem2clg} = req.body;
    
            const newGaming = new Gaming({
                leader:req.user.email,
                teamName: teamName,
                mem1name: mem1name,
                mem1email: mem1email,
                mem1clg: mem1clg,
                mem2name: mem2name,
                mem2email: mem2email,
                mem2clg: mem2clg,

              
            });
            newGaming.save()
                  .then((value)=>{
                    User.findOneAndUpdate(
                        {email : req.user.email} , 
                        {gaming:1}
                    ).then((data1)=>{
                        transporter.sendMail({

                            from:process.env.OEMAIL,
                            to:req.user.email,
                            subject:'Registered for Gaming',
                            text:'Congratulations, you have registered for Gaming , Udgam 2022'

                        }, function(error, info){
                            if (error) {
                              console.log(error);
                            } else {
                              console.log('Email sent: ' + info.response);
                              res.redirect('/');
                            }
                          });
                    }).catch((err)=>{
                        console.log(err);
                        res.redirect('err.ejs');
                    })
                  })
                  .catch(value=> console.log(value));
    
       
  
  })

//////////////////////////////////////

//////////StrategyStorm////////////////
router.get("/strategystorm", ensureAuth ,async(req,res)=>{
    res.render('./old/ssform',{userinfo:req.user});
}) 

router.post('/strategystorm',(req,res)=>{
    const {teamName,mem1name,mem1email, mem1clg, mem2name,mem2email, mem2clg} = req.body;
    
            const newSS = new SS({
                leader:req.user.email,
                teamName: teamName,
                mem1name: mem1name,
                mem1email: mem1email,
                mem1clg: mem1clg,
                mem2name: mem2name,
                mem2email: mem2email,
                mem2clg: mem2clg,
   
            });
            newSS.save()
                  .then((value)=>{
                    User.findOneAndUpdate(
                        {email : req.user.email} , 
                        {strategy_storm:1}
                    ).then((data1)=>{
                        transporter.sendMail({

                            from:process.env.OEMAIL,
                            to:req.user.email,
                            subject:'Registered for Strategy Storm',
                            text:'Congratulations, you have registered for Strategy Storm , Udgam 2022'

                        }, function(error, info){
                            if (error) {
                              console.log(error);
                            } else {
                              console.log('Email sent: ' + info.response);
                              res.redirect('/');
                            }
                          });
                    }).catch((err)=>{
                        console.log(err);
                        res.redirect('err.ejs');
                    })
                  })
                  .catch(value=> console.log(value));
    
       
  
  })


  ///////////////////////////

  //////////CodingCollab//////////////

  router.get("/codingcollab", ensureAuth ,async(req,res)=>{
    res.render('./old/ccform',{userinfo:req.user});
}) 

router.post('/codingcollab',(req,res)=>{
    const {teamName,mem1name,mem1email, mem1clg, mem2name,mem2email, mem2clg} = req.body;
    
            const newCC = new CC({
                leader:req.user.email,
                teamName: teamName,
                mem1name: mem1name,
                mem1email: mem1email,
                mem1clg: mem1clg,
                mem2name: mem2name,
                mem2email: mem2email,
                mem2clg: mem2clg,

            });
            newCC.save()
                  .then((value)=>{
                    User.findOneAndUpdate(
                        {email : req.user.email} , 
                        {coding_collab:1}
                    ).then((data1)=>{
                        transporter.sendMail({

                            from:process.env.OEMAIL,
                            to:req.user.email,
                            subject:'Registered for Coding Collab',
                            text:'Congratulations, you have registered for Coding Collab , Udgam 2022'

                        }, function(error, info){
                            if (error) {
                              console.log(error);
                            } else {
                              console.log('Email sent: ' + info.response);
                              res.redirect('/');
                            }
                          });
                    }).catch((err)=>{
                        console.log(err);
                        res.redirect('err.ejs');
                    })
                  })
                  .catch(value=> console.log(value));
    
  })

  // encode routes //


router.get("/events/encode",async(req,res)=>{
    const id1 = '61b0e7f46922abd65fd17812';
    LaunchDetail.findById(id1).then((data)=>{
        res.render('encode',{userinfo:req.user , data});
    }).catch((err)=>{
        console.log(err);
    })
    
})

router.get("/encode/register",async(req,res)=>{
    const id1 = '61b0e7f46922abd65fd17812';
    LaunchDetail.findById(id1).then((data)=>{
        res.render('encode_register',{userinfo:req.user , data});
    }).catch((err)=>{
        console.log(err);
    })
})  

router.post('/encode', async(req,res)=>{

    
    const id = genuid({
        length: 4,
        useLetters: false
    });

    var pass = "test"+id;
    var tpass = "test"+id;
    pass = await bcrypt.hash(pass,10);


    var password;
    
   
    const {teamname,leadername,leaderemailID ,leaderphone,M2name,M2emailID,M3name,M3emailID,M4name,M4emailID,formwhere,careffid} = req.body;
    let errors = [];
            var flag = 1;
            if(formwhere==5 && careffid==""){
                flag =0;
            }
            
            if(!req.user){
                password = req.body.password;
                var passhash = await bcrypt.hash(password,10); 
            }

            if(flag==1){
            const newEncode = new Encode({
                teamname: teamname,
                leadername: leadername,
                leaderemailID: leaderemailID,
                leaderphone: leaderphone,
                // M1name: "",
                // M1emailID: "",
                // M1phone: "",
                M2name: M2name,
                M2emailID: M2emailID,
                // M2phone: "",
                M3name: M3name,
                M3emailID: M3emailID,
                // M3phone: "",
                M4name: M4name,
                M4emailID: M4emailID,
                // M4phone: "",
                formwhere: formwhere,
                careffid: careffid,  
  
            });
            newEncode.save()
                  .then((value)=>{
                    if(req.user){
                        User.findOneAndUpdate(
                        {email : req.user.email} , 
                        {encode:1}
                    ).then((data1)=>{
                        
                        transporter.sendMail({

                            from:process.env.OEMAIL,
                            to:req.user.email,
                            subject:'Your are registered for Encode',
                            html:'You are registered for Encode',
                            // text:'Your password reset<br> secret key',
                
                        }, function(error, info){
                            if (error) {
                              console.log(error);
                              res.redirect('/dashboard')
                            } else {
                                res.render('confirmation',{title:"Congratulation!",msg:"You are registered for Encode"});
                            }
                          });

                        
                    }).catch((err)=>{
                        console.log(err);
                        res.redirect('err.ejs');
                    })
                }else{
                   
                   
                    var nemail = leaderemailID;

                    let uidarr=nemail.split("@");
                    let uid=uidarr[0];
                   
                    let upass = uid + "" + id + "@udgam-pass";
                    uid+=id+"@udgam";
                    

                    User.findOne({email : nemail}).exec((err,user)=>{

                            if(user){

                                bcrypt.compare(password, user.password, (err, isMatch) => {
                                    if (err) throw err;
                                    if (isMatch) {

                                        User.findOneAndUpdate(
                                            {email : nemail} , 
                                            {encode:1}
                                        ).then((data1)=>{
                                           
                                            transporter.sendMail({

                                                from:process.env.OEMAIL,
                                                to:nemail,
                                                subject:'Your are registered for Udgam and Encode',
                                                html:'You are registered for Encode',
                                                // text:'Your password reset<br> secret key',
                                    
                                            }, function(error, info){
                                                if (error) {
                                                  console.log(error);
                                                  res.redirect('/dashboard')
                                                } else {
                                                    res.render('confirmation',{title:"Congratulation!",msg:"You are registered for Encode"});
                                                }
                                              });
                                            
                                        }).catch((err)=>{
                                            console.log(err);
                                            res.redirect('/dashboard')
                                           
                                        })
        

                                    } else {
                                        
                                        res.render('confirmation',{title:"Error",msg:"Password incorrect"});
                                    }
                                  });
                               
                               

                            }else{

                             
                                
                                const newUser = new User({
                                    googleId : "",  
                                    displayName : leadername,
                                      email : nemail,
                                      password : passhash,
                                      upass:0,
                                      uid: uid,
                                      upassid: upass,
                                      w1:0,
                                        w2:0,
                                        w3:0,
                                        w4:0,
                                        w5:0,
                                        pmx:0,
                                        disrupt:0,
                                        dframe:0,
                                        fe:0,
                                        workshop:0,
                                        pd:0,
                                        ls:0,
                                        ama:0,
                                        nec:0,
                                        sparkle:0,
                                        encode:1,
                                        cosmic:0,
                                        coding_collab:0,
                                        strategy_storm:0,
                                        gaming:0,
                                        workshop1:0,
                                        workshop2:0,
                                        workshop3:0,
                                        workshop4:0,
                                        internfair:0,
                                  college:"",
                                  pkey:"",
                                  });

                                  newUser.save()
                                  .then((data) => {

                                    transporter.sendMail({

                                        from:process.env.OEMAIL,
                                        to:nemail,
                                        subject:'Your are registered for Udgam and Encode',
                                        html:'<h1>Email :' + nemail + '</h1> <br> <h1>Password : ' + password,
                                        // text:'Your password reset<br> secret key',
                            
                                    }, function(error, info){
                                        if (error) {
                                          console.log(error);
                                          res.redirect('/dashboard')
                                        } else {
                                            res.render('confirmation',{title:"Congratulation!",msg:"Done, you are also registered for Udgam , check your mail for credentials"});
                                        }
                                      });


                                  }).catch((err) => {

                                        console.log(err);

                                  })


                            }


                    })

           


                }
                  })
                  .catch(value=> console.log(value));
            }else{
                errors.push({msg : "Referrel ID is Required"})
                const id1 = '61b0e7f46922abd65fd17812';
                LaunchDetail.findById(id1).then((data)=>{
                    res.render('encode_register',{userinfo:req.user , data,errors});
                }).catch((err)=>{
                    console.log(err);
                })
                
            }

})

// encode routes end//

  

// pmx routes //
 
router.get("/events/pmx", async(req,res)=>{
    const id1 = '61b0e7f46922abd65fd17812';
    LaunchDetail.findById(id1).then((data)=>{
        res.render('pmx',{userinfo:req.user , data});
    }).catch((err)=>{
        console.log(err);
    })
    
}) 

router.get("/events/disrupt", async(req,res)=>{
    const id1 = '61b0e7f46922abd65fd17812';
    LaunchDetail.findById(id1).then((data)=>{
        res.render('disrupt',{userinfo:req.user , data});
    }).catch((err)=>{
        console.log(err);
    })
    
}) 

router.get("/pmx/register",async(req,res)=>{
    const id1 = '61b0e7f46922abd65fd17812';
    LaunchDetail.findById(id1).then((data)=>{
        res.render('pmx_register',{userinfo:req.user , data});
    }).catch((err)=>{
        console.log(err);
    })
})  

 
router.post('/pmx', async(req,res)=>{

    const id = genuid({
        length: 4,
        useLetters: false
    });

    var pass = "test"+id;
    var tpass = "test"+id;
    pass = await bcrypt.hash(pass,10);

        var password;

    const {teamname,leadername,leaderemailID,leaderphone,M2name,M2emailID,M3name,M3emailID,M4name,M4emailID,havepart1,havepart2,havepart3,havepart4,formwhere,careffid} = req.body;
    console.log(req.body);
    let errors = [];    
        var flag = 1;
            if(formwhere==5 && careffid==""){
                flag =0;
            }

            if(!req.user){
                password = req.body.password;
                var passhash = await bcrypt.hash(password,10); 
            }

            if(flag==1){
            const newPmx = new Pmx({
                
                teamname: teamname,
                leadername: leadername,
                leaderemailID: leaderemailID,
                leaderphone: leaderphone,
                // M1name: "",
                // M1emailID: "",
                // M1phone: "",
                M2name: M2name,
                M2emailID: M2emailID,
                // M2phone: "",
                M3name: M3name,
                M3email: M3emailID,
                // M3phone: "",
                M4name: M4name,
                M4emailID: M4emailID,
                // M4phone: "",
                havepart1: havepart1,
                havepart2: havepart2,
                havepart3: havepart3,
                havepart4: havepart4,
                formwhere: formwhere,
                careffid: careffid,
                
  
            });
            newPmx.save()
                  .then((value)=>{

                    if(req.user){

                    User.findOneAndUpdate(
                        {email : req.user.email} , 
                        {pmx:1}
                    ).then((data1)=>{
                        const filePath = path.join(__dirname, '../public/event.html');
                        const source = fs.readFileSync(filePath, 'utf-8').toString();
                        const template = handlebars.compile(source);
                        const replacements = {
                            name: req.user.displayName,
                            event: "PMx - The Product Management Expedition"
                        };
                        const htmlToSend = template(replacements);
                        transporter.sendMail({

                            from:process.env.OEMAIL,
                            to:req.user.email,
                            subject:'Your are registered for PMx',
                            html:htmlToSend
                            // text:'Your password reset<br> secret key',
                
                        }, function(error, info){
                            if (error) {
                              console.log(error);
                              res.redirect('/dashboard')

                            } else {
                                res.render('confirmation',{title:"Congratulation!",msg:"You are registered for PMx"});
                            }
                          });

                     
                        
                    }).catch((err)=>{
                        console.log(err);
                        res.redirect('err.ejs');
                    })

                }else{

                        
                    var nemail = leaderemailID;

                    let uidarr=nemail.split("@");
                    let uid=uidarr[0];
                   
                    let upass = uid + "" + id + "@udgam-pass";
                    uid+=id+"@udgam";
                    

                    User.findOne({email : nemail}).exec((err,user)=>{

                            if(user){

                                bcrypt.compare(password, user.password, (err, isMatch) => {
                                    if (err) throw err;
                                    if (isMatch) {

                                        User.findOneAndUpdate(
                                            {email : nemail} , 
                                            {pmx:1}
                                        ).then((data1)=>{
                                            const filePath = path.join(__dirname, '../public/event.html');
                                            const source = fs.readFileSync(filePath, 'utf-8').toString();
                                            const template = handlebars.compile(source);
                                            const replacements = {
                                                name: req.user.displayName,
                                                event: "PMx - The Product Management Expedition",
                                                
                                            };
                                            const htmlToSend = template(replacements);
                                                            
                                            transporter.sendMail({

                                                from:process.env.OEMAIL,
                                                to:nemail,
                                                subject:'Your are registered for PMx',
                                                html:htmlToSend
                                                // text:'Your password reset<br> secret key',
                                    
                                            }, function(error, info){
                                                if (error) {
                                                  console.log(error);
                                                  res.redirect('/dashboard')
                                                } else {
                                                    res.render('confirmation',{title:"Congratulation!",msg:"You are registered for PMx"});
                                                }
                                              });
                                            
                                        }).catch((err)=>{
                                            console.log(err);
                                            res.redirect('/dashboard')
                                            // res.redirect('err.ejs');
                                        })
        

                                    } else {
                                        res.render('confirmation',{title:"Error",msg:"Password incorrect"});
                                    }
                                  });
                               
                               

                            }else{

                             
                                
                                const newUser = new User({
                                    googleId : "",  
                                    displayName : leadername,
                                      email : nemail,
                                      password : passhash,
                                      upass:0,
                                      uid: uid,
                                      upassid: upass,
                                      w1:0,
                                        w2:0,
                                        w3:0,
                                        w4:0,
                                        w5:0,
                                        pmx:1,
                                        disrupt:0,
                                        dframe:0,
                                        fe:0,
                                        workshop:0,
                                        pd:0,
                                        ls:0,
                                        ama:0,
                                        nec:0,
                                        sparkle:0,
                                        encode:0,
                                        cosmic:0,
                                        coding_collab:0,
                                        strategy_storm:0,
                                        gaming:0,
                                        workshop1:0,
                                        workshop2:0,
                                        workshop3:0,
                                        workshop4:0,
                                        internfair:0,
                                  college:"",
                                  pkey:"",
                                  });
                                
                                  const filePath = path.join(__dirname, '../public/event_udgam.html');
                                const source = fs.readFileSync(filePath, 'utf-8').toString();
                                const template = handlebars.compile(source);
                                const replacements = {
                                    name: leadername,
                                    event: "PMx - The Product Management Expedition",
                                    password: password
                                };
                                const htmlToSend = template(replacements);
                                  newUser.save()
                                  .then((data) => {

                                    transporter.sendMail({

                                        from:process.env.OEMAIL,
                                        to:nemail,
                                        subject:'Your are registered for Udgam and PMx',
                                        html:htmlToSend,
                                        // text:'Your password reset<br> secret key',
                            
                                    }, function(error, info){
                                        if (error) {
                                          console.log(error);
                                          res.redirect('/dashboard')
                                        } else {
                                            res.render('confirmation',{title:"Congratulation!",msg:"Done, you are also registered for Udgam , check your mail for credentials"});
                                        }
                                      });


                                  }).catch((err) => {

                                        console.log(err);
                                        res.redirect('/dashboard')

                                  })


                            }


                    })

                }
                  })

                
                  .catch(value=> console.log(value));
            }else{
                errors.push({msg : "Referrel ID is Required"})
                const id1 = '61b0e7f46922abd65fd17812';
                LaunchDetail.findById(id1).then((data)=>{
                    res.render('pmx_register',{userinfo:req.user , data,errors});
                }).catch((err)=>{
                    console.log(err);
                })
            }

})


// interfair routes //

router.get("/events/internfair", async(req,res)=>{
    const id1 = '61b0e7f46922abd65fd17812';
    LaunchDetail.findById(id1).then((data)=>{
        res.render('internfair',{userinfo:req.user , data});
    }).catch((err)=>{
        console.log(err);
    })
    
})  

router.get("/internfair/register",async(req,res)=>{
    const id1 = '61b0e7f46922abd65fd17812';
    LaunchDetail.findById(id1).then((data)=>{
        res.render('internfair',{userinfo:req.user , data});
    }).catch((err)=>{
        console.log(err);
    })
})  


// lecture-series routes //

router.get("/events/lecture-series",async(req,res)=>{
    const id1 = '61b0e7f46922abd65fd17812';
    LaunchDetail.findById(id1).then((data)=>{
        res.render('lecture-series',{userinfo:req.user , data});
    }).catch((err)=>{
        console.log(err);
    })
    
}) 

router.get("/lecture-series/register",async(req,res)=>{
    res.render('lecture-series_register',{userinfo:req.user});
})  


// panel-discussions routes //

router.get("/events/panel-discussion",async(req,res)=>{
    const id1 = '61b0e7f46922abd65fd17812';
    LaunchDetail.findById(id1).then((data)=>{
        res.render('panel-discussion',{userinfo:req.user , data});
    }).catch((err)=>{
        console.log(err);
    })
    
})

router.get("/panel-discussion/register",async(req,res)=>{
    res.render('panel-discussion_register',{userinfo:req.user});
})



// workshops routes //

router.get("/events/workshops",async(req,res)=>{
    const id1 = '61b0e7f46922abd65fd17812';
    LaunchDetail.findById(id1).then((data)=>{
        res.render('workshops',{userinfo:req.user , data});
    }).catch((err)=>{
        console.log(err);
    })
    
}) 

router.get("/workshops/register",async(req,res)=>{
    res.render('workshops_register',{userinfo:req.user});
})  


// nec routes //

router.get("/events/nec",async(req,res)=>{
    const id1 = '61b0e7f46922abd65fd17812';
    LaunchDetail.findById(id1).then((data)=>{
        res.render('nec',{userinfo:req.user , data});
    }).catch((err)=>{
        console.log(err);
    })
    
}) 

router.get("/nec/register",async(req,res)=>{
    res.render('nec_register',{userinfo:req.user});
})  


//////Disrupt///////////////////////

router.get("/events/disrupt", async(req,res)=>{
    res.render('./old/disruptform',{userinfo:req.user});
}) 

router.post('/disrupt',(req,res)=>{
    const {teamName,mem1name,mem1email, mem1clg, mem2name,mem2email, mem2clg} = req.body;
    
            const newDisrupt = new Disrupt({
                leader: req.user.email,
                teamName: teamName,
                mem1name: mem1name,
                mem1email: mem1email,
                mem1clg: mem1clg,
                mem2name: mem2name,
                mem2email: mem2email,
                mem2clg: mem2clg, 
            });
            newDisrupt.save()
                  .then((value)=>{  

                    User.findOneAndUpdate(
                        {email : req.user.email} , 
                        {disrupt:1}
                    ).then((data1)=>{

                        transporter.sendMail({

                            from:process.env.OEMAIL,
                            to:req.user.email,
                            subject:'Registered for Disrupt',
                            text:'Congratulations, you have registered for Disrupt , Udgam 2022'

                        }, function(error, info){
                            if (error) {
                              console.log(error);
                            } else {
                              console.log('Email sent: ' + info.response);
                              res.redirect('/');
                            }
                          });

                       
                    }).catch((err)=>{
                        console.log(err);
                        res.redirect('err.ejs');
                    })

                      
                  })
                  .catch(value=> console.log(value));
    
       
  
  })

//////////////////////////////

router.get("/event_pass_info", async(req,res)=>{
    res.render('event_pass_info',{userinfo:req.user})
})

router.get('/buy_upass', ensureAuth ,(req,res) => {
	res.render('buy_upass' , {userinfo:req.user});
})

router.post('/charge', (req, res) => {

    const f_id = {
        docName : 'f_id',
        location : 'LA'
    }


    try {
        stripe.customers.create({
            name: req.user.displayName,
            email: req.user.email,
            source: req.body.stripeToken
        }).then(customer => stripe.charges.create({
            amount: 100*100,
            currency: 'inr',
            customer: customer.id,
            description: 'Thank you for buying'
        })).then(() =>


        User.findOneAndUpdate(
            {email : req.user.email} , 
            {upass:1}
        )
            .then((data1) => {

                
                const save = async()=> {
                    const data_f = {
                        "Name":req.user.displayName,
                        "Id":req.user.upassid
                    }

                    await User_f.add({ data_f });
                }

                save()
                .then((data) => {
                    res.render('./old/upass_complete' , {userinfo : req.user});
                })
                .catch((err) => {
                    console.log(err);
                    res.render('err');
                })
               
            })
            .catch((err1) => {
              console.log(err1);
              res.render('err');
            })

         
         )
            .catch(err => console.log(err))
    } catch (err) { res.send(err) }
})


router.get('/dashboard', ensureAuth ,(req,res) => {
  
   
        const id1 = '61b0e7f46922abd65fd17812';
        LaunchDetail.findById(id1).then((data)=>{
            res.render('dashboard',{userinfo:req.user , data , token : 0});
        }).catch((err)=>{
            console.log(err);
        })
    }) 





router.get('/purchase', ensureAuth ,(req,res) => {
	res.render('./old/buy_upass' , {userinfo:req.user});
})

router.get('/contact_us', ensureAuth ,(req,res) => {
	res.render('contact_us' , {userinfo:req.user});
})

//routes for frontend

//Team routes
router.get('/ourteam' ,(req, res) => {
    res.render('ourteams', {userinfo:req.user});
  })

//Sponsers routes
router.get('/sponsors' ,(req, res) => {
    res.render('sponsors', {userinfo:req.user});
  })

//Contact routes
router.get('/contactus' ,(req, res) => {
    res.render('contact_us', {userinfo:req.user});
  })

//Speaker routes
router.get("/speakers", async(req,res)=>{
    res.render('speakers',{userinfo:req.user});
})



// Forgot Password
router.get("/forgotPassEmail", async(req,res)=>{
    res.render('forgotPasswordEmail');
}) 

router.post("/forgotPassKey", async(req,res)=>{


    var em = req.body.email;

    const pkey = genuid({
        length: 6,
        useLetters: false
      });


    User.findOneAndUpdate(
        {email : em} , 
        {pkey:pkey}
    ).then((data1)=>{
        const filePath = path.join(__dirname, '../public/forgot_pass.html');
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        const template = handlebars.compile(source);
        const replacements = {
            secret_key: pkey,
        };
        const htmlToSend = template(replacements);

        transporter.sendMail({

            from:process.env.OEMAIL,
            to:em,
            subject:'UDGAM: Password Reset',
            html: htmlToSend, 

        }, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              res.render('passwordReset' , {email:em , userinfo:req.user,flag:0});
            }
          });

       
    }).catch((err)=>{
        console.log(err);
        res.redirect('err.ejs');
    })

}) 

router.post("/passwordResetDone", async(req,res)=>{


    var em = req.body.email;
    var pkey = req.body.pkey;
    
    var tnpass = req.body.npass;
    var cnpass = req.body.cnpass;

    req.body.npass = await bcrypt.hash(req.body.npass,10);
    var npass = req.body.npass;

   

    // bcrypt.hash(npass, (hash) => {
    //     req.body.npass = hash
      
    //     // then update
        // User.findOneAndUpdate(
        //     {email : em , pkey:pkey} , 
        //     {password:npass , pkey:""}
        // ).then((data1)=>{
    
        //     res.render('confirmation' , {title:"Done" , msg:"Password updated"});
    
        // }).catch((err)=>{
        //     console.log(err);
        //     res.redirect('err.ejs');
        // })
    //   });    

    User.findOne({email:em})
    .then((user) => {

            if(user.pkey == pkey && tnpass == cnpass){


                    User.findOneAndUpdate({email:em},{password:npass,pkey:""})
                    .then((data) => {
                        res.render('confirmation' , {title:"Done" , msg:"Password updated"});      
                    })
                    .catch((err) => {
                        res.render('passwordReset' , {email:em , userinfo:req.user,flag:1}); 
                    })


            }else if(tnpass != cnpass){
                res.render('passwordReset' , {email:em , userinfo:req.user,flag:2});
            }else{
                res.render('passwordReset' , {email:em , userinfo:req.user,flag:3});
            }

    })
    .catch((err) => {

        res.render('confirmation' , {title:"Error" , msg:"Password not updated"});    

    })

}) 

router.get("/login_error", async(req,res)=>{
    res.render('login', {errdata:1 , userinfo:req.user});
}) 


/////Subscribe////

router.post('/subscribe',async(req,res)=>{


    var email = req.body.email;

console.log(email);
    const subs = new Subscriber({

email:email,

    })

    subs.save()
    .then((data) => {

        res.render('confirmation' , {title: "Added" , msg : "Congratulations, you are successfully added in our mailing list"})

    }).catch((err)=>{

        console.log(err);
    })

})

router.post('/edit_name',async(req,res)=>{


    var nname = req.body.name;

    User.findOneAndUpdate(
        {email : req.user.email} , 
        {displayName : nname}
    ).then((data1)=>{
        
        const id1 = '61b0e7f46922abd65fd17812';
        LaunchDetail.findById(id1).then((data)=>{
            res.render('dashboard',{userinfo:req.user , data , token : 1});
        }).catch((err)=>{
            console.log(err);
        })

    }).catch((err)=>{
        console.log(err);
        res.redirect('err');
    })

    

})

router.post('/edit_password',async(req,res)=>{


    var opass = req.body.opass;
    var npass = req.body.npass;
    var cnpass = req.body.cnpass;

    console.log(npass + " " + cnpass);

    if(npass == cnpass){

        var hnpass = await bcrypt.hash(npass,10);

        bcrypt.compare(opass, req.user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {

                User.findOneAndUpdate(
                    {email : req.user.email} , 
                    {password:hnpass}
                ).then((data1)=>{
                   
                    
                    const id1 = '61b0e7f46922abd65fd17812';
        LaunchDetail.findById(id1).then((data)=>{
            res.render('dashboard',{userinfo:req.user , data , token : 2});
        }).catch((err)=>{
            console.log(err);
        })
                     
                }).catch((err)=>{
                    console.log(err);
                    res.redirect('err.ejs');
                })


            } else {
                const id1 = '61b0e7f46922abd65fd17812';
                LaunchDetail.findById(id1).then((data)=>{
                    res.render('dashboard',{userinfo:req.user , data , token : 3});
                }).catch((err)=>{
                    console.log(err);
                })
            }
        })

    }else{

        const id1 = '61b0e7f46922abd65fd17812';
                LaunchDetail.findById(id1).then((data)=>{
                    res.render('dashboard',{userinfo:req.user , data , token : 4});
                }).catch((err)=>{
                    console.log(err);
                })
    }

    

})

router.post("/contactus_done", async(req,res)=>{


   var email = req.body.email;
   var name = req.body.name;
   var msg = req.body.msg;
   var reason = req.body.reason;

   transporter.sendMail({

    from:process.env.OEMAIL,
    to:process.env.OEMAIL,
    subject:'A user contacted',
    html:'Name :' + name + '<br> Email : ' + email + '<br> Reason  :' + reason + '<br> Msg : ' + msg , 
  

}, function(error, info){
    if (error) {
      console.log(error);
    } else {
        res.render('confirmation',{title:"Done!",msg:"Your messaged reached us"});

    }
  });

}) 


/////temp

router.get("/abcd", async(req,res)=>{
    res.render('passwordReset' , {email:"hello" , userinfo:req.user});
}) 

module.exports=router;