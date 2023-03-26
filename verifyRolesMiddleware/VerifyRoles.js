
 function verifyRoles(...roleList) {
    return (req, res, next) => {
        if (req.method !== "POST"){
            return res.json('invalid method')
        }else if(req.url !== 'https://store-mgt-api.onrender.com/user-log/signup'){
            return res.json('invalid url')
        }
       try{
        if (!req?.roles) return res.status(209).send('you must be signed role')
        const allowedRoles = [...roleList]
        console.log('supplied', req.roles)
        console.log('allowed',allowedRoles)
        const result = req.roles.map(role => allowedRoles.includes(role)).find(val => val === true)
        if (!result) return res.status(209).send("wrong role supplied")
        next()
       }catch(e){
       return res.send(e.message)

       }




    }
}
module.exports = verifyRoles