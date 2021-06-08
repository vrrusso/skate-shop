const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./model/user')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

const uri = "mongodb+srv://hiro:hiromoto96@cluster0.f5ass.mongodb.net/skate-shop";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

const app = express()
app.use('/', express.static(path.join(__dirname, 'guest')))
app.use(bodyParser.json())


app.post('/api/login', async (req, res) => {
    const { mail, password } = req.body
    const user = await User.findOne({ mail }).lean()

    if (!user) {
        return res.json({ status: 'error', error: 'Invalid username/password' })
    }

    const token = jwt.sign(
        {
            id: user._id,
            mail: user.mail
        },
        JWT_SECRET
    )

    return res.json({ status: 'ok', data: token })

})


app.post('/api/register', async (req, res) => {
    
    const{
        name,
        mail,
        phone,
        birth,
        cpf,
        address,
        cep,
        city,
        state,
        base,
        password
    } = req.body

    try {
        const response = await User.create({
            name,
            mail,
            phone,
            birth,
            cpf,
            address,
            cep,
            city,
            state,
            base,
            password
        })
        console.log('User created successfully: ', response)
    } catch (error) {
        if (error.code === 11000) {
            // duplicate key
            return res.json({ status: 'error', error: 'Username already in use' })
        }
        throw error
    }

    res.json({status: 'ok'})
})


app.listen(9999, () => {
    console.log('Server up at 9999')
})