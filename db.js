const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://shivaji:shivaji@cluster0.narig.mongodb.net/amazona?retryWrites=true&w=majority', {useNewUrlParser : true})
const conn = mongoose.connection


// making of database table for users
const user = new mongoose.Schema({
    name : String,
    username: String,
    email : String,
    pass : String    
})
var userModel = mongoose.model('user',user)

const order = new mongoose.Schema({
     username : String,
     Address : String,
     Time : String,
     gt : Number,
     PaymentMethod : String,
     otp : Number,
     cartitem : String,
     Deliver : Boolean,
})

var orderModel = mongoose.model('orders', order)


module.exports ={
    userModel, conn, orderModel
}





