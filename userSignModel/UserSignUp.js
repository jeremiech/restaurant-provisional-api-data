const mongoose=require('mongoose')
const user=new mongoose.model('UserSignUp',new mongoose.Schema({
    fullName:String,
    email:String,
    mobile:String,
    password:String,
    token:String
}))
module.exports=user