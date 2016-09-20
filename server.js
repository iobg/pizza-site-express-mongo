'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const { cyan, red } = require('chalk')
const {connect}=require('./database')
const session = require('express-session')
const RedisStore=require('connect-redis')(session)
 
const routes = require('./routes/')// same as ./routes/index.js

const app = express()

// Get port from environment and store in Express.
const port = process.env.PORT || 3000
app.set('port', port)

// pug configuration
app.set('view engine', 'pug')

if (process.env.NODE_ENV !== 'production') {
  // app.locals.pretty = true
}

app.locals.company = '🍕 Tha pizzaz'


// middlewares
app.use(({ method, url, headers: { 'user-agent': agent } }, res, next) => {
  const timeStamp = new Date()
  console.log(`[${timeStamp}] "${cyan(`${method} ${url}`)}" "${agent}"`)
  next()
})
app.use(session({
  store:new RedisStore(),
  secret:'heyitsmeurbrother'
}))
app.use((req,res,next)=>{
    app.locals.email=req.session.email
    next()
})
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))


app.use(routes)

// Custom 404 page
app.use((req, res) =>
  res.render('404')
)

// Error handling middleware
app.use((
    err,
    { method, url, headers: { 'user-agent': agent } },
    res,
    next
  ) => {
    res.sendStatus(err.status || 500)
    const timeStamp = new Date()
    const statusCode = res.statusCode
    const statusMessage = res.statusMessage
    console.error(
      `[${timeStamp}] "${red(`${method} ${url}`)}" Error (${statusCode}): "${statusMessage}"`
    )
    console.error(err.stack)
  }
)

// Listen to requests on the provided port and log when available
connect().then(()=>{
  app.listen(port, () =>{
     console.log(`Listening on port: ${port}`)
  }

)
}).catch(console.error)

