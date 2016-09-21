'use strict'
let {Router}=require('express')
const router = Router()
let{post,index}= require('../controllers/logout')

router.post('/logout',post)


router.get('/logout',index)

module.exports=router
