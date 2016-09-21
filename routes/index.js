'use strict'

const { Router } = require('express')
const router = Router()
const bcrypt = require('bcrypt')
const Order = require('../models/order')
const Size = require('../models/size')
const Toppings = require('../models/toppings')

router.get('/', (req, res) =>
  res.render('index')
)

router.use(require('./about'))
router.use(require('./logout'))
router.use(require('./login'))
router.use(require('./register'))
router.use(require('./contact'))

//guard middleware
router.use((req,res,next)=>{
  if(req.session.email){
    next()
  }
  else res.redirect('/login')
})

router.get('/order', (req, res) =>{
  Size.find({})
  .sort({inches:1})
  .then(sizes=>
  Toppings.find({})
  .then(toppings=>{res.render('order',{page:"order", sizes, toppings})
}))
})

router.post('/order', (req, res, err) =>
  Order
    .create(req.body)
    .then(() => res.redirect('/'))
    .catch(err)
)


module.exports = router

