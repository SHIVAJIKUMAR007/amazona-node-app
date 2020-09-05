var express = require('express');
var router = express.Router();
var session = require('session')
var cookie = require('cookie')
var data = require('../data')
const db = require('../db')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users/index',{user : req.session.username , data : data})
});

router.get('/cart', function(req, res, next) {
  res.render('users/cart',{user : req.session.username })
});


router.get('/checkout/:gt', function(req, res, next) {
  res.render('users/checkout',{user : req.session.username , gt : req.params.gt })
});

router.get('/product/:id', (req, res )=>{
  data.map(data =>{
     if(data.id == req.params.id){
       res.render('users/product',{user :req.session.username ,data : data})
     }
  })
})

router.get('/profile', (req, res, next )=>{
  let findUser = db.userModel.find({
    username: req.session.username,
    })
  findUser.exec((err,res2)=>{
    if(err) throw err
    db.orderModel.find({ username : req.session.username }).exec((er,res3)=>{
      res.render('users/porfi',{userdata : res2[0], orderData : res3,fail : ''})
    }) 
  })
})

router.get('/profile/:fail', (req, res, next )=>{
  let findUser = db.userModel.find({
    username: req.session.username,
    })
  findUser.exec((err,res2)=>{
    if(err) throw err
    db.orderModel.find({ username : req.session.username }).exec((er,res3)=>{
      res.render('users/porfi',{userdata : res2[0], orderData : res3,fail : req.params.fail})
    }) 
  })
})

// painga hai check once 

router.post('/profile',(req,res,next)=>{
  let updateUser = db.userModel.updateOne({username:req.session.username},{
    name : req.body.name, email : req.body.email, pass : req.body.pass    
 })
 updateUser.exec((e,res3)=>{
   if(e) throw e 
   console.log(res3)
     res.redirect('/users/profile/Profile Updated') 
 })  
})



router.post('/conformorder/:gt',(req,res,next)=>{
     let cartItem = req.body.cartitem
     let otp = Math.floor(Math.random()*900001)+100000
     let time = new Date()
      let order = new db.orderModel({
      username : req.session.username, Address : `Address : ${req.body.add}, city : ${req.body.city},
       country : ${req.body.country}, pincode : ${req.body.pin}`, Time : time , gt : req.params.gt,
       PaymentMethod :req.body.payment , otp : otp,  cartitem: cartItem, Deliver : false,  
     })
     order.save((e,res2)=>{
          res.redirect('/users/placed/'+time+'/'+otp.toString())
     })
})

router.get('/placed/:time/:otp',(req,res,next)=>{
  db.orderModel.find({ Time : req.params.time, otp : parseInt(req.params.otp) }).exec((er,res3)=>{
    if(er) throw er
    res.render('users/placed',{data : res3[0],time : req.params.time,otp:req.params.otp})
  })
})



module.exports = router;
