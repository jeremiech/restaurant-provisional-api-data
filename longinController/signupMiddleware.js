
const SignUp = require('../userSignModel/UserSignUp')
const ValidationSchema = require('../userValidation/UserValidation')
const bcrypt = require('bcryptjs')


async function signup(req,res){
    if(req.method !=='POST') {
        return   res.send('invalid method')
    }
    const { error } = ValidationSchema.validate(req.body)
    if (error) {
        return res.json({ message: error.details[0].message })
    }
    const { fullName, email, mobile, password, roles } = req.body


    const duplicateUser = await SignUp.findOne({ fullName: fullName, email: email })
    if (duplicateUser)  return res.json({ message: `user ${fullName} already exists ...` })

    const hashPaswd = bcrypt.hashSync(password, 10)
    await SignUp.create({
        fullName, email, mobile, password: hashPaswd, roles: roles
         
      
    
}).then(data=>{
    return res.status(201).json({ data: data })
}).catch(err=>{return res.json(err.message)})

}

module.exports=signup