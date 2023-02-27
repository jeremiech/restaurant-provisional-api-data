const mongoose = require('mongoose')
const Order = require('../orderModel/OrderModel')
const Stock = require('../stockModel/Stock')
const Router = require('express').Router()
const math = require('mathjs')
const Status = require('../stock-status/StokStatus')


async function updateRemainder(req) {
    const stock=await Stock.findOne({name:req.params.name}).select('total_remain -_id')
    return Stock.updateOne({name:req.params.name},{ $set: { total_remain: math.subtract(stock.total_remain, req.body.quantity) } })
}


async function updateStock(req, res) {

    const stock = await Stock.findOne({ name: req.params.name })

    if (stock !== null) {
        if (stock.total_remain < req.body.quantity) {
            res.send(`the only stock remain: ${stock.total_remain}`)
        } else {
            await Status.create({
                name: req.body.name,
                total: math.multiply(req.body.quantity, stock.unit_price),
                quantity: req.body.quantity,
                unit_price: stock.unit_price,
                status: "out",
            })
            await new Order({
                customerName: req.body.customerName,
                name: req.params.name,
                quantity: req.body.quantity,
                unit_price: stock.unit_price,
                total: math.multiply(req.body.quantity, stock.unit_price)


            }).save((err, data) => {
                if (!err) {
                    res.json(`Order ${data.name} has successfully made`)
                }
            })

            await Stock.findOne({ name: req.params.name }).exec(updateRemainder(req))





        }
    } else res.send(`no stock ${req.params.name} Remain`)

}

Router.post('/make-order/:name', async (req, res) => {
    const stock=await Stock.findOne({name:req.params.name}).select('total_remain -_id')
    // res.json(`${stock.total_remain}`)
    const { name } = req.params
    await Stock.findOne({ name: name }).exec(updateStock(req, res))
})


module.exports = Router