var express = require('express')
const multer = require('multer')
var router = express.Router()
const path = require('path')
const { read } = require('fs')
const JSAlert = require('js-alert')
// const session = require('express-session')
const data = require('../data')
const db = require('../db')
const { find } = require('../data')

router.use(express.static(path.join(__dirname, './public/')));

router.get('/checkout/:gt',(req,res,next)=>{
  if(req.session.username){
    res.redirect('/users/checkout/'+req.params.gt)

  }else 
  res.redirect(`/signin/${req.params.gt}`)

})

router.get('/signup',(req,res,next)=>{
  res.render('signup',{fail: ''})
})

router.get('/signin',(req,res,next)=>{
  res.render('login',{fail: ''})
})

router.get('/signin/:fail',(req,res,next)=>{
  res.render('login',{fail: req.params.fail}) 
})

router.post('/signup',(req,res,next)=>{ 
  let findUser = db.userModel.find({
    username: req.body.username
 })
 findUser.exec((e,res3)=>{
   if(e) throw e 
    if(res3.length){
      console.log(res3)
      res.render('signup',{fail : 'username already exists !!'})
    }else{
      let newUser = new db.userModel({
        name : req.body.name, email : req.body.email, username: req.body.username, pass : req.body.pass
      })
       newUser.save((err,res2)=>{
         if(err) throw err
         res.redirect(`/signin/${'register successfully \n login now !!'}`) 
       })
    }
 })  
})

router.post('/signin/:gt',(req,res,next)=>{
  let user = req.body.username
  let findUser = db.userModel.find({
     username: user,
     pass : req.body.pass
  })
   findUser.exec((err,res2)=>{
     if(err) throw err
      if(res2.length){
      req.session.username = user
      console.log(req.session.username)
      res.redirect('/users/cart') 
      }else{
        res.render('login',{fail : 'username or password is incorrect'})
      }
   })
})

router.post('/signin/',(req,res,next)=>{
  let user = req.body.username
  let findUser = db.userModel.find({
     username: user,
     pass : req.body.pass
  })
   findUser.exec((err,res2)=>{
     if(err) throw err
      if(res2.length){
      req.session.username = user
      console.log(req.session.username)
      res.redirect('/users') 
      }else{
        res.render('login',{fail : 'username or password is incorrect'})
      }
   })
})

router.get('/',(req,res)=>{
  res.render('index',{data : data})
})

router.get('/cart',(req,res)=>{
  res.render('cart')
})

router.get('/product/:id', (req, res )=>{
   data.map(data =>{
      if(data.id == req.params.id){
        res.render('product',{data : data})
      }
   })
})

router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/')
})

router.get('/api/data',(req,res)=>{
  res.send(data)
})

router.get('/api/data/:otp/:time',(req,res)=>{
  db.orderModel.find({ Time : req.params.time, otp : parseInt(req.params.otp) }).exec((er,res3)=>{
    if(er) throw er
    res.send(JSON.parse(res3[0].cartitem))
  })
})







module.exports = router;
