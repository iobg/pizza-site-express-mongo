let {Router}=require('express')
const router=Router();
const {index,post}=require('../controllers/order')

router.get('/order', index)

router.post('/order', post )
module.exports=router
