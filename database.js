'use strict'
const mongoose =require('mongoose')
const MONGODB_URL='mongodb://localhost:27017/pizzacontact';

Promise = require('bluebird')
mongoose.Promise = Promise


module.exports.connect=()=>mongoose.connect(MONGODB_URL)
