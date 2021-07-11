/**
 * Victor Rodrigues Russo 11218855
 */


const express = require('express')

const app = express()
const bodyParser = require('body-parser')


const router = express.Router()
const indexRoute = require('./routes/index')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//to serve the index public page
app.use(express.static('./src/public'))

//to serve the mains resources
app.use(express.static('./src/resources'))






app.use('/',indexRoute)


module.exports = app