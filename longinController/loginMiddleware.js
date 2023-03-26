const SignUp = require('../userSignModel/UserSignUp')
const Router = require('express').Router()
const jwt = require('jsonwebtoken')
const RolesList=require('../verifyRolesMiddleware/RolesList')
const verifyRoles=require('../verifyRolesMiddleware/VerifyRoles')
require('dotenv/config')
const { SECRET_kEY, REFRESH_KEY } = process.env
const bcrypt=require('bcryptjs')

async function loginMiddle(req,res){

    const { email, password } = req.body
    const result = await SignUp.findOne({ email: email })
    if (!result) return res.json({ message: `${email} not found` })
    const matchedPass = bcrypt.compareSync(password, result.password)
    const role = Object.values(result.roles)
    if (result && matchedPass) {
        const token = jwt.sign({
            userDetails: {
                email: email,
                roles: role
            }
        }, SECRET_kEY, { expiresIn: '1day' })
    
        const refreshToken = jwt.sign({
            userDetails: {
                email: email,
                roles: role
            }
        }, REFRESH_KEY, { expiresIn: '2day' })
    
        // result.token=refreshToken
        await result.updateOne({ $set: { token: refreshToken } })
    
    
        try {
             res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 48 })
                    return res.json({ token: token })
        } catch (e) {
            return res.json({ message: e.message })
        }
    
    } else {
       return res.status(403).json({ message: "forbiden user Login" })
    }
} 

module.exports=loginMiddle