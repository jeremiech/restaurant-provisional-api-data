const User=require('../userSignModel/UserSignUp')
async function deleteEmployees(req,res){
    await User.findOneAndDelete({email:req.body.email,fullName:req.body.fullName}).then(data=>{
        if(data){
            res.send(`user ${data.fullName} has deleted successfully`)
        }else{
            res.send(`user ${data.fullName} does not exists`)
        }
        
    }).catch(er=>res.status(500).send(er.message))

}
module.exports=deleteEmployees