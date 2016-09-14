'use strict'
const {Router}=require('express')
const app=Router();
const mongoose = require('mongoose');
const {db}= require('../database')
app.get('/', (req, res) =>
  res.render('index')
)

app.get('/about', (req, res) =>
  res.render('about', { page: 'About' })
)

app.get('/form', (req, res) =>
  res.render('form', { page: 'Contact' })
)
const Contact = mongoose.model('Contact')
app.post('/form',(req,res)=>{
	const msg = new Contact(req.body)
	msg.save()
 res.redirect('/')
})

module.exports=app
