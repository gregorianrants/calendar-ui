const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

console.log(authController.signIn)

router.post('/signin',authController.signIn)

module.exports = router