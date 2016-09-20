'use strict'

const { Router } = require('express')
const router = Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
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
  let{email,password}=req.body
  User.findOne({email})
  .then(user=>{
    if(user){
      bcrypt.compare(password,user.password,(err,matches)=>{
        if(matches){
              req.session.email=email   
              res.render('login',{error:"Successfully logged in"})
            } 
        else res.render('login', {error:'Email and password do not match'})
    })
  }
})
})
    
router.get('/register',(req,res)=>{
  res.render('register')
})
router.post('/register',(req,res)=>{
  if(req.body.password===req.body.passwordConfirm){
    User.findOne({email:req.body.email})
    .then(user=>{
      if(user){
        res.render('register',{error:"Email is already registered"})
      }
       else{
        return new Promise((resolve,reject)=>{
          bcrypt.hash(req.body.password,13,(err,hash)=>{
          User.create({email:req.body.email,password:hash})
          resolve(hash)
         })
      }).then(res.render('register',{error:"Successfully registered"}))
    }
  })
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

