const mongoose = require('mongoose')
const Product = new mongoose.Schema({
    name: String,
    description: String,
    supplier: {
        fullName: String,
        email: String,
        mobile: String,
        address:String,
    },
    unit_price: Number,
    status: {
        type: String,
        default: "in"
    },
    wholeSellerPrice: Number,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    expire_Date: {
        type: Date,
        default: Date.now()
    }





})
module.exports = new mongoose.model('product', Product)