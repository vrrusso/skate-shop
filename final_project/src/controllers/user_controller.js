/**
 *  Victor Rodrigues Russo 11218855 
 */

 const mongoose = require('mongoose')
 const User = mongoose.model('User')
 

 
 exports.post = (req,res,next) => {
     var user = new User(req.body)
     user.save().then(x => {res.status(201).send({message: "Usuário Criado com Sucesso"})}).catch(e => {res.status(400).send({message: "Falha ao cadastrar o usuário", data:e})})
     
 }
 
