const express=require('express')
const mongoose =require('mongoose')
const cors=require('cors')
require('dotenv/config')
const productController=require('./product-controller/productController')
mongoose.connect(process.env.URL).then(()=>{
    console.log('DB connected')
    const app=express()
    app.use(cors())
    app.use(express.json())
    app.use('/prod',productController)



    app.listen(process.env.PORT,()=>console.log(`Server is listening to ${process.env.PORT}`))

    
})