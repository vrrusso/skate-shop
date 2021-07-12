/**
 *  Victor Rodrigues Russo 11218855 
 */

 const mongoose = require('mongoose')
 const User = mongoose.model('User')
 

 
 exports.post = (req,res,next) => {
     var user = new User(req.body)
     user.save().then(x => {res.status(201).send({message: "Usuário Criado com Sucesso"})}).catch(e => {res.status(400).send({message: "Falha ao cadastrar o usuário", data:e})})
     
 }
 
 exports.getUserByMailPassword = (req,res,next) =>{
     User.findOne({
         mail: req.body.mail,
         password: req.body.password
     }).then(data => {
         if(data == null){
            res.status(400).send({message: "Falha na Autenticação"})
         }
         res.status(200).send({data:data,message:"Login concluído com sucesso"})
     }).catch(e => {res.status(400).send({message:"Falha no sistema"})})
 }


 exports.getById = (req,res,next)=>{
     User.findById(req.params.id)
     .then(data => {
        if(data == null){
            res.status(400).send({message: "Falha ao Procurar Usuário"})
         }
         res.status(200).send({data:data})
     }).catch(e => {res.status(400).send({message:"Falha no sistema"})})
 }


 exports.updateById = (req,res,next)=>{
    User.findByIdAndUpdate(req.params.id,{
        $set: {
            name:req.body.name,
            mail:req.body.mail,
            phone:req.body.phone,
            birth:req.body.birth,
            cpf:req.body.cpf,
            address:req.body.address,
            cep: req.body.cep,
            city: req.body.city,
            state: req.body.state,
            base: req.body.base

        }
    }).then(x => {res.status(200).send({message: "Usuário Atualizado com Sucesso"})}).catch(e => {res.status(400).send({message: "Falha ao atualizar o usuário", data:e})})
 }