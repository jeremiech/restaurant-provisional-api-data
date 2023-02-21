const mongoose = require('mongoose')
const SupplierModel=require('../supplierModel/SupplierMod')
const supplierSchema = require('../SupplierSchema/SupSchema')
const SupplierSchema=require('../SupplierSchema/SupSchema')
const Product = new mongoose.Schema({
    name: String,
    description: String,
    supplier:supplierSchema,
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