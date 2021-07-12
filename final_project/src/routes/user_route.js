/**
 * Victor Rodrigues Russo 11218855
 */

 const express = require('express')
 const router = express.Router()
 const controller = require('../controllers/user_controller')
 
 router.post('/',controller.post)
  
  module.exports = router