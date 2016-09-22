'use strict'

const passport = require('passport')
const LocalStrategy=require('passport-local').Strategy
const bcyrpt=require('bcrypt')
const User = require('./models/user')

passport.serializeUser((user,cb)=>cb(null,user.id))

passport.use('local',new LocalStrategy({usernameField:"email",passwordField:"password"},
		(username,password,done)=>{
			User.findOne({username})
  .then(user=>{
    if(user){
      bcrypt.compare(password,user.password,(err,matches)=>{
        if(matches){
              req.session.email=username  
              done(null,user,{message:"Successfully logged in"})
            } 
        else done(null,false,{message:"Incorrect password"})
    })
  }
  else done(null,false,{message:"Username does not exist"})
})
			
}
))
