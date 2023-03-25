const express=require('express')
const cookieParser=require('cookie-parser')
const verifyJwt=require('./userAuth/userAuth')
const mongoose =require('mongoose')
const cors=require('cors')
const swags=require('swagger-ui-express')
const stock=require('./stockController/StockControl')
const handleRefreshToken=require('./refreshToken/refreshTokenController')
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
    app.use(verifyJwt)
    app.use(cookieParser())
    app.use('/order',order)
    app.use('/docs',swags.serve,swags.setup(stockDocumentedOject))
    app.use('/stock',stock)
    app.use('/refresh',handleRefreshToken)
    app.use('/user-log',UserSignup)



    app.listen(process.env.PORT,()=>console.log(`Server is listening to ${process.env.PORT}`))

    
})