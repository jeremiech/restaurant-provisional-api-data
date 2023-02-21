const mongoose=require('mongoose')
const SupSuppler=require('../SupplierSchema/SupSchema')


const SupplierModel=new mongoose.model('Supplier',SupSuppler)
module.exports=SupplierModel
