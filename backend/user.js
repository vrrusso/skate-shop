const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        mail: { type: String, required: true, unique: true },
        phone: { type: String, required: true,},
        birth: { type: String, required: true},
        cpf: { type: String, required: true, unique: true },
        address: { type: String, required: true },
        cep: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        base: { type: String, required: true },
        password: { type: String, required: true }
    }
);

const model = mongoose.model('User', UserSchema)

module.exports = model