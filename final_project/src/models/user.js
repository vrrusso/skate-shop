
const mongoose = require('mongoose')
const Schema = mongoose.Schema


const schema = new Schema({
    name: { type: String, required: true },
    privilege: {type: Number,required:true},
    mail: { type: String, required: true, unique: true },
    phone: { type: String, required: true,},
    birth: { type: String, required: true},
    cpf: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    cep: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    base: { type: String, required: true },
    password: { type: String, required: true },
    img_path: {type:String, required: true}
})

module.exports = mongoose.model('User',schema)