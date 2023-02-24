const mongoose=require('mongoose')
module.exports=new mongoose.model('Order',new mongoose.Schema({
    customerName:String,
    name:String,
    quantity:Number,
    unit_price:Number,
    total:Number,
    
    createdAt:{
        type:Date,
        default:Date.now()

}
}
))