const mongoose=require('mongoose')
const stock_Status=new mongoose.model('status',new mongoose.Schema({
    name:String,
        dateCreated:{
            type:Date,
            default:Date.now()

        },
        expireDate:{
            type:Date,
        },
        quantity:Number,
        unit_price:Number,
        total:Number,
        status:String
}))

module.exports=stock_Status