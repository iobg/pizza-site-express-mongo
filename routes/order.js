let {Router}=require('express')
const router=Router();

const Order = require('../models/order')
const Size = require('../models/size')
const Toppings = require('../models/toppings')


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
module.exports=router
