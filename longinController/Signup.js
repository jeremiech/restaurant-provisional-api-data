const SignUp = require('../userSignModel/UserSignUp')
const Router = require('express').Router()
const auth=require('../userAuth/userAuth')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const ValidationSchema = require('../userValidation/UserValidation')


Router.post('/signup', async (req, res) => {
    const { error } = ValidationSchema.validate(req.body)
    if (error) {
        res.json({ message: error.details[0].message })
    }





    const { fullName, email, mobile, password } = req.body
    const hashPaswd = bcrypt.hashSync(password, 10)
    await SignUp.create({
        fullName, email, mobile, password: hashPaswd
    },(err,user)=>{
        if(!err){
            const secret = process.env.SECRET_kEY
            const token = jwt.sign({ _id: user._id, email: user.email }, secret, { expiresIn: '1h' })
            user.token=token

            res.status(201).json({user:user.fullName,token:token})
        }
    })
           
        

})



Router.post('/signin', auth,async (req, res) => {
    const { email, password } = req.body
    const result = await SignUp.findOne({ email: email })
    const matchedPass = bcrypt.compareSync(password, result.password)
    if (result && matchedPass){
        const token = jwt.sign({ _id: result._id, email: result.email }, secret, { expiresIn: '1h' })
        result.token=token

        try{
            res.status(201).json({user:result.fullName})
        }catch{
            res.status(501).json({message:"there was mistake while trying loging you"})
        }

    }else {
        res.status(403).json({message:"Invalid user Login"})
    }


})

module.exports = Router
