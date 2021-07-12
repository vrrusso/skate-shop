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

exports.getById= (req,res,next) => {
    Product.findById(req.params.id).then(data =>{
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
    Product.findByIdAndDelete(req.params.id
    ).then(data => {res.status(200).send({message: "Produto Removido com Sucesso"})}).catch(e => {res.status(400).send({message: "Falha ao remover o produto", data:e})})
}


exports.put = (req,res,next) => {
    Product.findByIdAndUpdate(req.params.id,{
        $set: {
            price:req.body.price,
            name:req.body.name,
            brand:req.body.brand,
            size: req.body.size,
            color: req.body.color,
            stock: req.body.stock,
            description: req.body.description
        }
    }).then(x => {res.status(201).send({message: "Produto Atualizado com Sucesso"})}).catch(e => {res.status(400).send({message: "Falha ao atualizar o produto", data:e})})
}