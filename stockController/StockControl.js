const math = require('mathjs')
const Router = require('express').Router()
const Supplier = require("../supplierModel/SupplierMod")
const Stock = require('../stockModel/Stock')

async function updateQuantity(req) {

    const stok = await Stock.findOne({ name: req.body.name })
    if (stok !== null) {
        let stockQuantity = stok.quantity
        let newStockQty = req.body.quantity
        let qty = math.add(stockQuantity, newStockQty)
        total = math.add(stok.total_remain, newStockQty)

        const newStockIn={
            name:req.body.name,quantity:req.body.quantity,unit_price:stok.unit_price,total:qty
        }
        



        return await Stock.updateOne({ $set: { quantity: qty, stock_in: newStockIn, total_remain: total } })
    } else {
        return await Stock({
            name: req.body.name,
            quantity: req.body.quantity,
            supplier: new Supplier({ fullName: req.body.fullName, email: req.body.email, mobile: req.body.mobile, address: req.body.address }),
            unit_price: req.body.unit_price,
            stock_in: {
                name:req.body.name,
                quantity:math.add(0, req.body.quantity),
                unit_price:req.body.unit_price,
                total:math.add(0, req.body.quantity)
            },
            total_remain: math.add(0, req.body.quantity)


        }).save()
    }


}



Router.get("/stock-in",async(req,res)=>{
    const stock=await Stock.find().select("stock_in -_id")
    res.json(stock)
})
Router.get("/stock-out",async(req,res)=>{
    const stock=await Stock.find().select("stock_out -_id")
    res.json(stock)
})


Router.post('/add-stock', async (req, res) => {
    const stok = await Stock.findOne({ name: req.body.name })
        .exec(updateQuantity(req))




    res.json(`${stok} has recorded successfully`)

})
async function editStock(req){
    return await Stock.updateOne({$set:{quantity:req.body.quantity,unit_price:req.body.unit_price}})
}



Router.put('/edit/:name',async(req,res)=>{
    const {name}=req.params
    const stock=await Stock.findOne({name:name}).exec(editStock(req))
    res.json(`${stock.name} has updated successfully`)

})


Router.get('/list',async(req,res)=>{
    const stock=await Stock.find().select('-_id')
    res.json(stock)
})




module.exports = Router