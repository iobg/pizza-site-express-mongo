'use strict'

const Order = require('../models/order')
const Size = require('../models/size')
const Toppings = require('../models/toppings')

module.exports.index=(req, res) =>{
  Size.find({})
  .sort({inches:1})
  .then(sizes=>
  Toppings.find({})
  .then(toppings=>{res.render('order',{page:"order", sizes, toppings})
}))
}

module.exports.post=(req, res, err) =>
  Order
    .create(req.body)
    .then(() => res.redirect('/'))
    .catch(err)
