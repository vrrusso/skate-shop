const express = require('express')
const path = require('path')


const app = express()
app.use('/', express.static(path.join(__dirname, './')))


app.listen(8888, () => {
    console.log('Server up at 8888')
})