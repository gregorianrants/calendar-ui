const dotenv = require("dotenv");

dotenv.config();
const express = require("express");
const router = express.Router();
const usersController = require('./../controllers/usersController')
const checkJwt = require('./../authMiddleware/checkJwt')

// router.get('/',checkJwt,usersController.getUser)
//

router.get('/',checkJwt,usersController.getUser)
router.post('/',checkJwt,usersController.createUser)

module.exports = router