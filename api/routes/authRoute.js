const express = require('express')
const router = express.Router()
const gcalController = require('../controllers/gcalController')
const checkJwt = require('./../authMiddleware/checkJwt')



router.get('/url',gcalController.getUrl)
router.get('/authourize',checkJwt,gcalController.authorizeUser)


module.exports = router
