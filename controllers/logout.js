'use strict'

module.exports.post=(req,res)=>{
  req.session.destroy((err)=>{
    if(err) throw(err)
      res.redirect('/login')
  })
 }

module.exports.index=(req,res)=>{
  res.render('logout')
}


