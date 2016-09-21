'use strict'

let {Router}=require('express')
let router=Router();
let {index,post}=require('../controllers/login')

router.get('/login',index)

router.post('/login',post)

module.exports=router;
