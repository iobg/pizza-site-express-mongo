'use strict'
const {Router}=require('express')
const app=Router();

app.get('/', (req, res) =>
  res.render('index')
)

app.get('/about', (req, res) =>
  res.render('about', { page: 'About' })
)

app.get('/form', (req, res) =>
  res.render('form', { page: 'Contact' })
)

app.post('/form', (req, res) => {
  console.log(req.body)
  res.redirect('/')
})

module.exports=app
