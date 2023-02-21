const mongoose=require('mongoose')
const supplierSchema=new mongoose.Schema({
    fullName:String,
    email:String,
    mobile:String,
    address:String
})
module.exports=supplierSchema