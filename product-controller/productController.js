const Router=require('express').Router()
const Product=require('../product-model/Product')
const SupplierModel=require('../supplierModel/SupplierMod')

Router.post('/add-product',async(req,res)=>{
    const product=await new Product({
        name: req.body.name,
    description: req.body.description,
    supplier: new SupplierModel({
        fullName: req.body.fullName,
        email: req.body.email,
        mobile: req.body.mobile,
        address:req.body.address
    }),
    unit_price: req.body.unit_price,
   
    wholeSellerPrice: req.body.wholeSellerPrice,
 
    })
    if(product.save())res.send(`${product.name} has Recorded`)
    else res.status(501).send('there was error while trying to record product')


})


Router.get('/list',async(req,res)=>{
    const product=await Product.find()
    .populate('supplier')
    .select('-_id')
    if(product!=null){
        res.json(product)
    }
})
Router.get('/list/:name',async(req,res)=>{
    const {name}=req.params
    
    const product=await Product.findOne({name:name})
    if(product!=null){
        res.json(product.unit_price)
    }
})

Router.get('/list/:status',async(req,res)=>{
    const {status}=req.params
    let list=""
    if(status==="in"){
        list=await Product.find({status:{$eq:"in"}})
    }else if(status==="out"){
        list=await Product.find({status:{$eq:"out"}})


    }else{
        list=null
    }
    res.json(list)
    
})


Router.delete('/delete/:name',async(req,res)=>{
    const {name}=req.params
    await Product.findOneAndDelete({name:name})
})


Router.put('/edit/:name',async(req,res)=>{
    const {name}=req.params
    await Product.findOneAndUpdate({name:name},
        {$set:{
            name: req.body.name,
            unit_price: req.body.unit_price,                    
        }}
        ).then(prod=>res.send(`${prod.name} has updated successfully`))
        .catch(err=>res.status(501).send("there was error while trying to update"))
})



Router.get('/:name',async(req,res)=>{
    const {name}=req.params
    const product=await Product.find({name:name})
    res.send(`${product.length}`)
    // res.send(product.name[name]);
})



module.exports=Router