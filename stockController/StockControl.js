const math = require('mathjs')
const Router = require('express').Router()
const Stock = require('../stockModel/Stock')
const Status = require('../stock-status/StokStatus')

async function updateQuantity(req,res) {

    // if (req.body.expireDate==="" || req.body.expireDate === Date.now()) {
    //     res.status(403).json({ message: "set exact expiration" })
    // }



    const stok = await Stock.findOne({ name: req.body.name })
    let newStockQty = req.body.quantity
    let qty = 0
    if (stok !== null) {
        let stockQuantity = stok.quantity
        qty = math.add(stockQuantity, newStockQty)
        total = math.add(stok.total_remain, newStockQty)

        await Status.create({
            name: req.body.name,
            total: math.multiply(req.body.quantity, req.body.unit_price),
            quantity: req.body.quantity,
            unit_price: req.body.unit_price,
            status: "in",
        })






         await stok.updateOne({ $set: { quantity: qty, total_remain: total } })
         return res.json({ message: `current Stock  has updated successfully` })
    } else {
        await Status.create({
            name: req.body.name,
            total: math.multiply(req.body.quantity, req.body.unit_price),
            quantity: req.body.quantity,
            unit_price: req.body.unit_price,
            status: "in",
        })

          await Stock.create({
            name: req.body.name,
            quantity: req.body.quantity,
            category:req.body.category,
            supplier:req.body.supplier ,
            unit_price: req.body.unit_price,
          

            total_remain: math.add(0, req.body.quantity)
        })
        return res.json({ message: `new stock  has recorded successfully` })

    }


}



Router.get("/stock-in", async (req, res) => {
  

     const stock=await  Status.find({status:"in"})
    try{
     res.status(200).json({ data: stock })

    }catch{
        res.status(501).json({message:"internal server error"})
    }

    

})
Router.get("/stock-out", async (req, res) => {
 
    const stock=await  Status.find({status:"out"})
    try{
     res.status(200).json({ data: stock })

    }catch{
        res.status(501).json({message:"some mistake while trying to find stock out"})

    }
})


Router.post('/add-stock', async (req, res) => {
    await Stock.findOne({ name: req.body.name })
        .exec(updateQuantity(req,res))
    

})
async function editStock(req,res) {
    const {name}=req.params
    const stock = await Stock.findOne({ name: name })
    await stock.updateOne({ $set: { quantity: req.body.quantity, unit_price: req.body.unit_price,total_remain:req.body.quantity } })
    return res.json(`${stock.name} has updated successfully`)
}



Router.put('/edit/:name', async (req, res) => {
    const { name } = req.params
    const stock = await Stock.findOne({ name: name }).exec(editStock(req,res))
    

})


Router.get('/list', async (req, res) => {
    const stock = await Stock.find().select('-_id')
    res.json(stock)
})

Router.get('/list/:name', async (req, res) => {
    const {name}=req.params
    const stock = await Stock.find({name:name}).select('-_id')
    res.json(stock)
})




module.exports = Router