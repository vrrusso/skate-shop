/**
 * Victor Rodrigues Russo 11218855
 */


const express = require('express')

const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')



const uri = "mongodb+srv://admin_user:admin@cluster0.awwc2.mongodb.net/skate_shop";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,useFindAndModify: false })

db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to MongoBD")
    console.log("http://localhost:3000/")
});

//loading the models
const Product = require('./models/product')
const User = require('./models/user')



const indexRoute = require('./routes/index')
const productRoute = require('./routes/products_routes')
const userRoute = require('./routes/user_route')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//to serve the index public page
app.use(express.static('./src/public'))

//to serve the mains resources
app.use(express.static('./src/resources'))






app.use('/',indexRoute)
app.use('/product',productRoute)
app.use('/user',userRoute)


module.exports = app