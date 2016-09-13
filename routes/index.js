'use strict'
const {Router}=require('express')
const app=Router();
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

app.post('/form',(req,res)=>{
  db().collection('contact').insertOne(req.body).then(()=>{
    res.redirect('/')
    
  }).catch(()=>res.send('BAD'))
})

module.exports=app
