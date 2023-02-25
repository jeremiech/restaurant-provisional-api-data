const jwt=require('jsonwebtoken')
const secret=process.env.SECRET_kEY


function authanticate(req,res,next){
    const token=req.body.token || req.query.token || req.headers['x-access-token']
    if(!token){
       return  res.status(404).json({message:"token is required for authentication"})
    }
    try{
        const decoded=jwt.verify(token,secret)
        req.user=decoded
    }catch{
       return  res.status(400).send("there was mistake from yur request")
    }
    return next()

}
module.exports=authanticate