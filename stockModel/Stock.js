const mongoose =require('mongoose')
const Stock=new mongoose.model('Stock',new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    supplier:{
        fullName:String,
        email:String,
        mobile:String,
        address:String
    },
    unit_price:{
        type:Number,
        required:true
    },

    total_remain:Number,
    dateCreated:{
        type:Date,
        default:Date.now()

    },

    expireDate:{
        type:Date,
        required:true
    },


}))

module.exports=Stock