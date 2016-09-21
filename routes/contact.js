'use strict'

const {Router}=require('express')
const Contact = require('../models/contact')
const router =Router();

let {index,post}=require('../controllers/contact')

router.get('/contact',index)

router.post('/contact',post)

module.exports=router
