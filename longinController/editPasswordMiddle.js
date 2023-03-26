const SignUp = require('../userSignModel/UserSignUp')


async function edit(req,res){
    const { email } = req.body
    if (!email) {
        res.status(403).json({ message: "forbiden request" })
    }
    const user = await SignUp.findOne({ email: email })
    if (user) {
        await user.updateOne({ password: req.body.password }).then((data) => {
            if (data) {
                return res.json({ message: "password updated successfully..." })
            }

        })
    } else {return        res.send(`user ${email} not exists`)

    }

}
module.exports=edit