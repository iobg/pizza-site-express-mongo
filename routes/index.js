'use strict'
const {Router}=require('express')
const app=Router();
const Contact = require('../models/contact')
const Order = require('../models/order')
app.get('/', (req, res) =>
  res.render('index')
)

app.get('/about', (req, res) =>
  res.render('about', { page: 'About' })
)

app.get('/form', (req, res) =>
  res.render('form', { page: 'Contact' })
)

app.get('/order',(req,res)=>{
	res.render('order', { page:'Order'})
})
app.post('/order',(req,res)=>{
	const msg = new Order(req.body)
	msg.save()
 res.redirect('/')
})

app.post('/form',(req,res)=>{
	const msg = new Contact(req.body)
	msg.save()
 res.redirect('/')
})

module.exports=app
