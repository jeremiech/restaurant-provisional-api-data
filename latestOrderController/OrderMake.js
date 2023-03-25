const mongoose = require('mongoose')
const Order = require('../orderModel/OrderModel')
const Stock = require('../stockModel/Stock')
const Router = require('express').Router()
const math = require('mathjs')
const Status = require('../stock-status/StokStatus')
const stock = require('../documentAPI/documentedObejct/AddStockDoc')


async function updateRemainder(req) {
    const stock=await Stock.findOne({name:req.params.name}).select('total_remain -_id')
    return stock.updateOne({name:req.params.name},{ $set: { total_remain: math.subtract(stock.total_remain, req.body.quantity) } })
}


async function updateStock(req, res) {
    const {name}=req.params
    const stock = await Stock.findOne({ name: name.toLowerCase() })

    if (stock !== null) {
        if (stock.total_remain < req.body.quantity) {
            return res.json({message:`the only stock remain: ${stock.total_remain}`})
        } else {
            await Status.create({
                name: name.toLowerCase(),
                total: math.multiply(req.body.quantity, stock.unit_price),
                quantity: req.body.quantity,
                unit_price: stock.unit_price,
                status: "out",
            })
            await stock.updateOne({ $set: { total_remain: math.subtract(stock.total_remain, req.body.quantity) } })

            await new Order({
                customerName: req.body.customerName,
                name: name.toLowerCase(),
                quantity: req.body.quantity,
                unit_price: stock.unit_price,
                total: math.multiply(req.body.quantity, stock.unit_price)


            }).save((err, data) => {
                if (!err) {
                  return  res.json({message:`Order ${data.name} has successfully made`,data:data})
                }
            })






        }
    } else res.send(`no stock ${req.params.name} Remain`)

}

Router.post('/make-order/:name', async (req, res) => {

    const { name } = req.params
    await Stock.findOne({ name:name.toLowerCase()}).exec(updateStock(req, res))
})


async function updateStockForOrderRejection(req,res){
    const {name}=req.body
    const stock=await Stock.findOne({name:name.toLowerCase()})
    if(stock){
        await stock.updateOne({ $set: { total_remain: math.add(stock.total_remain, req.body.quantity) } })

    return res.json({message:` Stock ${req.body.name} has Rejected ${req.body.quantity} unit successfully`})
        }else {
        return res.status(500).json({message:`No stock ${req.body.name} found`})
    }
}


Router.post('/cancel-order',async(req,res)=>{

  if(reason==="cancelled"){
    let stock=await Stock.findOne({name:req.body.name}).exec(updateStockForOrderRejection(req,res))
    await Status.create({
        name:name.toLowerCase() ,
        total: math.multiply(req.body.quantity, stock.unit_price),
        quantity: req.body.quantity,
        unit_price: stock.unit_price,
        status: "cancelled",
    })
    
  }else {
    await Status.create({
        name:name.toLowerCase() ,
        total: math.multiply(req.body.quantity, stock.unit_price),
        quantity: req.body.quantity,
        unit_price: stock.unit_price,
        status: "other",
    })  }

    

})


module.exports = Router