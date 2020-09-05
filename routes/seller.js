var express = require('express');
var router = express.Router();
var session = require('session')
var cookie = require('cookie')
var data = require('../data')
const db = require('../db')




router.get('/', function(req, res, next) {
    db.orderModel.find({
        Deliver  : false
    }).exec((e, data2)=> res.render('seller/index',{data : data2, fail :''}))    
});

router.get('/:fail', function(req, res, next) {
    db.orderModel.find({
        Deliver  : false
    }).exec((e, data2)=> res.render('seller/index',{data : data2, fail :req.params.fail}))    
});


router.post('/:oid',(req,res,next)=>{
    db.orderModel.find({_id : req.params.oid}).exec((e, data)=>{ if(e)  throw e
        if (data[0].otp == req.body.otp) {
            //delete code remaining
            db.orderModel.updateOne({_id: req.params.oid},{Deliver : true}).exec((err, data2)=>{
                if(err ) throw err 
                res.redirect('/seller/OTP match, item deliverd')
            })
        }else{
            res.redirect('/seller/OTP does not match, item not delivered')
        }
    })
})
  




module.exports = router;
