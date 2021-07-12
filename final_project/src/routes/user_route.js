/**
 * Victor Rodrigues Russo 11218855
 */

 const express = require('express')
 const router = express.Router()
 const controller = require('../controllers/user_controller')
 
 router.post('/',controller.post)
 router.post('/login',controller.getUserByMailPassword)

 router.get('/:id',controller.getById)

 router.put('/:id',controller.updateById)
  
  module.exports = router