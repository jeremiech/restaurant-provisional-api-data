const jwt=require('jsonwebtoken')
require('dotenv/config')
const {SECRET_kEY}=process.env




async function authanticate(req,res,next){
    const authHeader=req.headers.Authorization || req.headers.authorization
    if(!authHeader?.startsWith('Bearer ')) res.status(401).send('un-authorized header')
    const token=authHeader.split(' ')[1]
    jwt.verify(token,SECRET_kEY,(err,decoded)=>{
            if(err) res.json({message:err.message})
            req.roles=decoded.userDetails.roles
            req.email=decoded.userDetails.email
            next()
      

    })






    

}
module.exports=authanticate