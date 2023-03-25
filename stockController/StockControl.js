const math = require('mathjs')
const Router = require('express').Router()
const Stock = require('../stockModel/Stock')
const Status = require('../stock-status/StokStatus')
const rolesVerifier = require('../verifyRolesMiddleware/VerifyRoles')
const roleList = require('../verifyRolesMiddleware/RolesList')
const verifyRoles = require('../verifyRolesMiddleware/VerifyRoles')
async function updateQuantity(req, res) {
    const { name } = req.body




    const stok = await Stock.findOne({ name: req.body.name })
    let newStockQty = req.body.quantity
    let qty = 0
    if (stok !== null) {
        let stockQuantity = stok.quantity
        qty = math.add(stockQuantity, newStockQty)
        total = math.add(stok.total_remain, newStockQty)

        await Status.create({
            name: name.toLowerCase(),
            total: math.multiply(req.body.quantity, req.body.unit_price),
            quantity: req.body.quantity,
            unit_price: req.body.unit_price,
            status: "in",
        })






        await stok.updateOne({ $set: { quantity: qty, total_remain: total } })

            .then((stock) => {
                return res.json({ message: `an existed Stock  has updated successfully`, result: stock })
            })

    } else {
        await Status.create({
            name: name.toLowerCase(),
            total: math.multiply(req.body.quantity, req.body.unit_price),
            quantity: req.body.quantity,
            unit_price: req.body.unit_price,
            status: "in",
        })

        await Stock.create({
            name: name.toLowerCase(),
            quantity: req.body.quantity,
            category: req.body.category,
            supplier: req.body.supplier,
            unit_price: req.body.unit_price,


            total_remain: math.add(0, req.body.quantity)
        }).then(data => {
            return res.json(data)
        })

    }


}



Router.get("/stock-in", rolesVerifier(roleList.Admin, roleList.StockManager),async (req, res) => {


    const stock = await Status.find({ status: "in" })
    try {
        res.status(200).json({ data: stock })

    } catch {
        res.status(501).json({ message: "internal server error" })
    }



})
Router.get("/stock-out", rolesVerifier(roleList.Admin, roleList.StockManager), async (req, res) => {

    const stock = await Status.find({ status: "out" })
    try {
        res.status(200).json({ data: stock })

    } catch {
        res.status(501).json({ message: "some mistake while trying to find stock out" })

    }
})


Router.post('/add-stock', verifyRoles(roleList.Admin,roleList.StockManager),async (req, res) => {
    await Stock.findOne({ name: req.body.name })
        .exec(updateQuantity(req, res))


})
async function editStock(req, res) {
    const { name } = req.params
    const stock = await Stock.findOne({ name: name })
    await stock.updateOne({ $set: { quantity: req.body.quantity, unit_price: req.body.unit_price, total_remain: req.body.quantity } })
        .then((result) => {
            return res.json({ message: `${name} has updated successfully`, result: result })

        })
}



Router.put('/edit/:name', async (req, res) => {
    const { name } = req.params
    await Stock.findOne({ name: name.toLowerCase() }).exec(editStock(req, res))


})


Router.get('/list', rolesVerifier(roleList.Admin, roleList.StockManager), async (req, res) => {
    const stock = await Stock.find().select('-_id')
    res.json(stock)
})

Router.get('/list/:name', rolesVerifier(roleList.Admin, roleList.StockManager),async (req, res) => {
    const { name } = req.params

    const stock = await Stock.find({ name: name }).select('-_id')
    res.json(stock)
})


Router.get('/status/cancelled', rolesVerifier(roleList.StockManager),async (req, res) => {
    await Status.find({ status: "cancelled" }).then(data => {
        res.json(data)
    }).catch(err => res.status(500).json({ message: err.message }))
})
Router.get('/status', async (req, res) => {
    await Status.find({}).then(data => {
        res.json(data)
    }).catch(err => res.status(500).json({ message: err.message }))
})



module.exports = Router