const mongoose = require('mongoose')
const Order = require('../orderModel/OrderModel')
const Stock = require('../stockModel/Stock')
const Router = require('express').Router()
const math = require('mathjs')



// async function updateStock(stock){
//     stock.stock_in.

// }

async function findSingleStockInUpdate(req) {



    const { name } = req.params
    const stock = await Stock.findOne({ name: name })
    const stockin = {
        name: req.params.name,
        quantity: math.subtract(stock.stock_in.quantity, req.body.quantity),
        unit_price: stock.unit_price,
        total: math.subtract(stock.total, req.body.quantity)



    }




    // stock.stock_in.quantity=math.subtract(stock.stock_in.quantity,req.body.quantity)
    return await Stock.updateOne({ $set: { stock_in: stockin } })
}




async function updateStock(req, res) {

    const stock = await Stock.findOne({ name: req.params.name })
    const stockOutUpdating = {
        name: req.params.name,
        quantity: req.body.quantity,
        unit_price: stock.unit_price,
        total: math.multiply(req.body.quantity, stock.unit_price)



    }


    const stockin = {
        name: req.params.name,
        quantity: math.subtract(stock.stock_in.quantity, req.body.quantity),
        unit_price: stock.unit_price,
        // total: math.subtract(stock.total, req.body.quantity)



    }
    if (stock !== null) {
// res.json(stock.stock_out.unit_price)

        if (stock.total_remain < req.body.quantity) {
            res.send(`the only stock remain: ${stock.total_remain}`)
        } else {
            await new Order({
                customerName:req.body.customerName,
                name: req.params.name,
                quantity: req.body.quantity,
                unit_price: stock.unit_price,
                total: math.multiply(req.body.quantity, stock.unit_price)


            }).save((err, data) => {
                if (!err) {
                    res.json(`Order ${data.name} has successfully made`)
                }
            })




            await Stock.updateOne(
                { $set: { stock_in: stockin, stock_out: stockOutUpdating,total_remain: math.subtract(stock.total_remain, req.body.quantity)} }

            )

        }
    } else res.send(`no stock ${req.params.name} Remain`)

}

Router.post('/make-order/:name', async (req, res) => {
    const { name } = req.params
    await Stock.findOne({ name: name }).exec(updateStock(req, res))
})


module.exports = Router