const Joi=require('joi')
const { string } = require('mathjs')
// email pattern:pattern(new RegExp('/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{3,12}$/'))
const ValidationSchema=Joi.object({
    fullName:Joi.string(),
    email:Joi.string().email({
        minDomainSegments:2,
        tlds:{allow:['net','com']}}),
        password:Joi.string().required(),
        mobile:Joi.number().required()

    

})
module.exports=ValidationSchema