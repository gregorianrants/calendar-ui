const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')



router.get('/url',authController.getUrl)
router.get('/authourize',authController.getAuthorization)

module.exports = router