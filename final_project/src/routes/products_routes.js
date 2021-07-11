/**
 * Victor Rodrigues Russo 11218855
 */

 const express = require('express')
 const router = express.Router()
 const controller = require('../controllers/product_controller')
  
 router.get('/type/:type',controller.getByType)
 router.post('/',controller.post)
 router.delete('/:key_string',controller.delete)
  
  
  module.exports = router