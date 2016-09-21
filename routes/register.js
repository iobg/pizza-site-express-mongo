let {Router}= require('express');
let router=Router()
let User =require('../models/user')
const bcrypt =require('bcrypt')

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

module.exports=router;
