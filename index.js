const express=require('express')
const mongoose =require('mongoose')
const cors=require('cors')
const stock=require('./stockController/StockControl')
require('dotenv/config')
// const orderController=require('./orderControler/ProdOrder')
const order=require('./latestOrderController/OrderMake')
const productController=require('./product-controller/productController')
mongoose.connect(process.env.URL).then(()=>{
    console.log('DB connected')
    const app=express()
    app.use(cors())
    app.use(express.json())
    app.use('/prod',productController)
    app.use('/order',order)
    app.use('/stock',stock)



    app.listen(process.env.PORT,()=>console.log(`Server is listening to ${process.env.PORT}`))

    
})