const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const checkJwt = require('./../authMiddleware/checkJwt')



router.get('/url',authController.getUrl)
router.get('/authourize',checkJwt,authController.authorizeUser)

module.exports = router