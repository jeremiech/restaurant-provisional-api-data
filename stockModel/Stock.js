const mongoose =require('mongoose')
const Supplier=require('../SupplierSchema/SupSchema')
const Stock=new mongoose.model('Stock',new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    supplier:Supplier,
    unit_price:{
        type:Number,
        required:true
    },
    stock_in:{
        name:String,
        dateCreated:{
            type:Date,
            default:Date.now()

        },
        quantity:Number,
        unit_price:Number,
        total:Number
    },
    stock_out:{
        name:String,
        dateCreated:{
            type:Date,
            default:Date.now()

        },
        quantity:Number,
        unit_price:Number,
        total:Number
    },
    total_remain:Number,
    dateCreated:{
        type:Date,
        default:Date.now()

    }


}))

module.exports=Stock