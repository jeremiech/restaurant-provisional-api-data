const SignUp = require('../userSignModel/UserSignUp')
const Router = require('express').Router()
const deleteEmployees=require('../deleteEmployee/deleteEmployee')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const RolesList=require('../verifyRolesMiddleware/RolesList')
const verifyRoles=require('../verifyRolesMiddleware/VerifyRoles')
const ValidationSchema = require('../userValidation/UserValidation')
require('dotenv/config')
const { SECRET_kEY, REFRESH_KEY } = process.env
const listEmployees = require('../EmployeeList/Employees')


Router.post('/signup', async (req, res) => {
    const { error } = ValidationSchema.validate(req.body)
    if (error) {
        res.json({ message: error.details[0].message })
    }
    const { fullName, email, mobile, password, roles } = req.body


    const duplicateUser = await SignUp.findOne({ fullName: fullName, email: email })
    if (duplicateUser) res.json({ message: `user ${fullName} already exists ...` })

    const hashPaswd = bcrypt.hashSync(password, 10)
    await SignUp.create({
        fullName, email, mobile, password: hashPaswd, roles: roles
    }, (err, user) => {
        if (!err) {


            res.status(201).json({ data: user })
        }
    })


    //  edit | change to make user update his password


    Router.post('/edit-password', async (req, res) => {
        res.send(req.body)
        const { email } = req.body
        if (!email) {
            res.status(403).json({ message: "forbiden request" })
        }
        const user = await SignUp.findOne({ email: email })
        if (user) {
            await user.updateOne({ password: req.body.password }).then((data) => {
                if (data) {
                    res.json({ message: "password updated successfully..." })
                }

            })
        } else {
            res.send(`user ${email} not exists`)

        }


    })



})





Router.get('/employees', verifyRoles(RolesList.Admin),listEmployees)
Router.delete('/delete',verifyRoles(RolesList.Admin),deleteEmployees)

Router.post('/signin', async (req, res) => {
    const { email, password } = req.body
    const result = await SignUp.findOne({ email: email })
    if (!result) res.json({ message: `${email} not found` })
    const matchedPass = bcrypt.compareSync(password, result.password)
    const role = Object.values(result.roles)
    if (result && matchedPass) {
        const token = jwt.sign({
            userDetails: {
                email: email,
                roles: role
            }
        }, SECRET_kEY, { expiresIn: 60 * 60 })

        const refreshToken = jwt.sign({
            userDetails: {
                email: email,
                roles: role
            }
        }, REFRESH_KEY, { expiresIn: '1day' })

        // result.token=refreshToken
        await result.updateOne({ $set: { token: refreshToken } })


        try {
            res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 })
            res.json({ token: token })
        } catch (e) {
            res.json({ message: e.message })
        }

    } else {
        res.status(403).json({ message: "forbiden user Login" })
    }


})

module.exports = Router
