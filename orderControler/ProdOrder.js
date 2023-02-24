const Router = require('express').Router()
const math = require('mathjs')
const Order = require('../orderModel/OrderModel')
const Product = require("../product-model/Product")


async function updateProductStutus(err,products){
    let stat=""
    if(!err){
         stat=products.map(st=>{
            return st.status
        });
    }
    return await Product.updateMany({status:{$in:stat}},{$set:{status:"out"}})

}


Router.post('/make-order/:name', async (req, res) => {
    const quantity = req.body.quantity
    const { name } = req.params
    let product = await Product.find({ name: name })
    let unitPrice=0
    let total=0
    if (product.length === 0) {
        res.send("No stock found")
    } else {
        if (quantity < product.length || quantity === product.length) {
            await Product.find({ name: name })
                .sort({ createdAt: -1 })
                .limit(quantity)
                .exec(updateProductStutus)             
            const price=await Product.findOne({ name: name }).sort({createdAt:-1})
            .select('unit_price -_id')
            unitPrice=price.unit_price
            total=math.multiply(unitPrice,quantity)
                        await new Order({
                            name:name,
                            quantity:quantity,
                            unit_price:unitPrice,
                            total:total
                        }).save((err,data)=>{
                            if(!err){
                                res.send(`Product  ${data.name}  has ordered successfully...`)
                            }
                        })


        } else {
            res.send("low stock remain")
        }
    }
})



module.exports = Router