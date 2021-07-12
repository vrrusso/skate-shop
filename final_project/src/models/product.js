const mongoose = require('mongoose')
const Schema = mongoose.Schema



const schema = new Schema({
    price: {
        type:Number,
        required: true,
    },
    name: {
        type: String,
        required:true,
        index:true
    },
    brand:{
        type: String,
        required:true,
    },
    type:{
        type:String,
        required: true,
    },
    size:{
        type:Number,
        required:true,
    },
    color:{
        type:String,
        required:true,
    },
    stock:{
        type:Number,
        required:true,
    },
    sold:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    img_path:{
        type:String,
        required:true
    }


})

schema.index({name: 'text'});

module.exports = mongoose.model('Product',schema)