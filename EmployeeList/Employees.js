const User=require('../userSignModel/UserSignUp')
async function listEmployees(req,res){
    await User.findOne({roles:"Employee"}).then(data=>res.json(data)).catch(er=>res.status(500).send(er.message))

}
module.exports=listEmployees