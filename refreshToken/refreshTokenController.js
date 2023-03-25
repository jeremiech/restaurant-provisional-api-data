const refresh=require('./Refresh')
const router=require('express').Router()
router.get('/',refresh)
module.exports=router