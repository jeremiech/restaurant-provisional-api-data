const Router=require('express').Router()
const Product=require('../product-model/Product')


Router.post('/add-product',async(req,res)=>{
    const product=await new Product({
        name: req.body.name,
    description: req.body.description,
    supplier: {
        fullName: req.body.fullName,
        email: req.body.email,
        mobile: req.body.mobile
    },
    unit_price: req.body.unit_price,
   
    wholeSellerPrice: req.body.wholeSellerPrice,
 
    })
    if(product.save())res.send(`${product.name} has Recorded`)
    else res.status(501).send('there was error while trying to record product')


})


Router.get('/list',async(req,res)=>{
    const product=await Product.find()
    if(product!=null){
        res.json(product)
    }
})
Router.get('/list/:name',async(req,res)=>{
    const {name}=req.params
    const product=await Product.findOne({name:name})
    if(product!=null){
        res.json(product)
    }
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
        )
})



module.exports=Router