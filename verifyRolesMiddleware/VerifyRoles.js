
 function verifyRoles(...roleList) {
    return (req, res, next) => {

        if (!req?.roles) return res.status(209).send('you must be signed role')
        const allowedRoles = [...roleList]
        console.log('supplied', req.roles)
        console.log('allowed',allowedRoles)
        const result = req.roles.map(role => allowedRoles.includes(role)).find(val => val === true)
        if (!result) return res.status(209).send("wrong role supplied")
        next()




    }
}
module.exports = verifyRoles