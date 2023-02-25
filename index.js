const express=require('express')
const mongoose =require('mongoose')
const cors=require('cors')
const bodyParser=require('body-parser')
const stock=require('./stockController/StockControl')
require('dotenv/config')
const UserSignup=require('./longinController/Signup')
// const orderController=require('./orderControler/ProdOrder')
const order=require('./latestOrderController/OrderMake')
const productController=require('./product-controller/productController')
mongoose.connect(process.env.URL).then(()=>{
    console.log('DB connected')
    const app=express()
    app.use(cors())
    app.use(express.urlencoded({extended:true}))
    app.use(express.json())
    app.use('/prod',productController)
    app.use('/order',order)
    app.use('/stock',stock)
    app.use('/user-login',UserSignup)



    app.listen(process.env.PORT,()=>console.log(`Server is listening to ${process.env.PORT}`))

    
})