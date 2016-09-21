let {Router}= require('express');
let router=Router()
let {index,post}=require('../controllers/register')

router.get('/register',index)
router.post('/register',post)

module.exports=router;
