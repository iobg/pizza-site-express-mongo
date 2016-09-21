'use strict'

const { Router } = require('express')
const router = Router()
const bcrypt = require('bcrypt')

router.get('/', (req, res) =>
  res.render('index')
)

router.use(require('./about'))
router.use(require('./contact'))
router.use(require('./login'))
router.use(require('./register'))

//guard middleware
router.use((req,res,next)=>{
  if(req.session.email){
    next()
  }
  else res.redirect('/login')
})

router.use(require('./logout'))
router.use(require('./order'))


module.exports = router

