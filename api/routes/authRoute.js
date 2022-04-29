const express = require('express')
const router = express.Router()
const gcalController = require('../controllers/gcalController')
const checkJwt = require('./../authMiddleware/checkJwt')
const {checkAuth} = require('../controllers/gcalController')



router.get('/url',gcalController.getUrl)
router.get('/authourize',checkJwt,gcalController.authorizeUser)
router.get('/events',checkJwt,gcalController.getJobs)
router.get('/check-auth',checkJwt,checkAuth)


module.exports = router
