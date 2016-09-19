'use strict'

const { Router } = require('express')
const router = Router()

const Contact = require('../models/contact')
const Order = require('../models/order')
const Size = require('../models/size')
const Toppings = require('../models/toppings')

router.get('/', (req, res) =>
  res.render('index')
)
router.get('/login', (req, res) =>
  res.render('login')
)
router.post('/login',(req,res)=>{
  if(req.body.password==='password'){
    res.redrect('/')
  }
  else{
    res.render('login', {error:'Email and password do not match'})
  }
})


router.get('/register',(req,res)=>{
  res.render('register')
})
router.post('/register',(req,res)=>{
  if(req.body.password===req.body.passwordConfirm){
    res.redrect('/')
  }
  else{
    res.render('register', {error:'Please confirm your password'})
  }
})


router.get('/about', (req, res) =>
  res.render('about', { page: 'About' })
)

router.get('/contact', (req, res) =>
  res.render('contact', { page: 'Contact' })
)

router.post('/contact', (req, res, err) =>
  Contact
    .create(req.body)
    .then(() => res.redirect('/'))
    .catch(err)
)


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

