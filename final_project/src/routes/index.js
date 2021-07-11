/**
 * Victor Rodrigues Russo 11218855
 */

const express = require('express')
const router = express.Router()

router.get('/info',(req,res,next)=>{
    res.status(200).send({
        title: 'Skate Shop API',
        author: 'Caio, Hiro and Russo',
    })


})


module.exports = router