const SignUp = require('../userSignModel/UserSignUp')
const Router = require('express').Router()
const deleteEmployees=require('../deleteEmployee/deleteEmployee')
const jwt = require('jsonwebtoken')
const edit=require('./editPasswordMiddle')
const RolesList=require('../verifyRolesMiddleware/RolesList')
const verifyRoles=require('../verifyRolesMiddleware/VerifyRoles')
require('dotenv/config')
const { SECRET_kEY, REFRESH_KEY } = process.env
const listEmployees = require('../EmployeeList/Employees')
const signupMiddle=require('./signupMiddleware')



const login=require('./loginMiddleware')
Router.post('/signup',signupMiddle)

    //  edit | change to make user update his password


    Router.post('/edit-password', edit)









Router.get('/employees', verifyRoles(RolesList.Admin),listEmployees)
Router.delete('/delete',verifyRoles(RolesList.Admin),deleteEmployees)

Router.post('/signin', login)

module.exports = Router
