const express=require('express')
const mongoose =require('mongoose')
const cors=require('cors')
const swags=require('swagger-ui-express')
const stock=require('./stockController/StockControl')
const stockDocumentedOject=require('./documentAPI/StockDocumentation')
require('dotenv/config')
const UserSignup=require('./longinController/Signup')
const order=require('./latestOrderController/OrderMake')
mongoose.connect(process.env.URL).then(()=>{
    console.log('DB connected')
    const app=express()
    app.use(cors())
    app.use(express.urlencoded({extended:true}))
    app.use(express.json())
    app.use('/order',order)
    app.use('/docs',swags.serve,swags.setup(stockDocumentedOject))
    app.use('/stock',stock)
    app.use('/user-login',UserSignup)



    app.listen(process.env.PORT,()=>console.log(`Server is listening to ${process.env.PORT}`))

    
})