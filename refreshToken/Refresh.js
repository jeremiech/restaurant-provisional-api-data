require('dotenv/config')
const User=require('../userSignModel/UserSignUp')
const jwt=require('jsonwebtoken')
const { SECRET_kEY, REFRESH_KEY } = process.env

const handleRefreshToken=async (req,res)=>{
    const cookies=req.cookies
    if(!cookies?.jwt) res.status(209).send("you must login to refresh token")
    const refreshToken=cookies.jwt
    const user=await User.findOne({token:refreshToken})
    if(!user) res.status(401).send('unauthorized user token')
    const roles=Object.values(user.roles)
    jwt.verify(user.token,REFRESH_KEY,(err,decoded)=>{
        if(err || user.email!==decoded.userDetails.email) res.json({message:err.message})
        req.user=decoded.userDetails.roles
        req.user=decoded.userDetails.email

        const newToken=jwt.sign({
            userDetails: {
                email: decoded.userDetails.email,
                roles: roles
            }
        }, SECRET_kEY, { expiresIn: 60 * 30 })
        
        return res.json({token:newToken})


    })


}
module.exports=handleRefreshToken