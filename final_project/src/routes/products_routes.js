/**
 * Victor Rodrigues Russo 11218855
 */

 const express = require('express')
 const router = express.Router()
 const controller = require('../controllers/product_controller')
  
 router.get('/type/:type',controller.getByType)
 router.get('/name/:name',controller.getByName)
 router.get('/',controller.getAll)
 router.get('/id/:id',controller.getById)


 router.post('/',controller.post)

 router.put('/:id',controller.put)

 router.put('/pay/:id',controller.updateProductSold)


 router.delete('/:id',controller.delete)
  
  
  module.exports = router