/**
 *  Victor Rodrigues Russo 11218855 
 */

const mongoose = require('mongoose')
const Product = mongoose.model('Product')

exports.getByType = (req,res,next) => {
    Product.find({
        type: req.params.type
    }).then(data =>{
        res.status(200).send(data)
    }).catch(e=>{
        res.status(400).send(e)
    })
}


exports.getByName= (req,res,next) => {
    Product.find({
        $text:{$search:req.params.name}
    }).then(data =>{
        res.status(200).send(data)
    }).catch(e=>{
        res.status(400).send(e)
    })
}

exports.getAll= (req,res,next) => {
    Product.find({}).then(data =>{
        res.status(200).send(data)
    }).catch(e=>{
        res.status(400).send(e)
    })
}


exports.post = (req,res,next) => {
    var product = new Product(req.body)
    product.save().then(x => {res.status(201).send({message: "Produto Criado com Sucesso"})}).catch(e => {res.status(400).send({message: "Falha ao cadastrar o produto", data:e})})
    
}

exports.delete = (req,res,next) => {
    res.status(200).send({message: "Succesfully deleted"})
}