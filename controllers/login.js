'use strict'
const User=require('../models/user') 
const bcrypt = require('bcrypt')

module.exports.index=(req, res) =>
  res.render('login')

module.exports.post=(req,res)=>{
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
}
