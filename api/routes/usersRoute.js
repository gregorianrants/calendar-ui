import dotenv from 'dotenv';

dotenv.config();
import express from 'express';
const router = express.Router();
import usersController from './../controllers/usersController.js';
import checkJwt from './../authMiddleware/checkJwt.js';

// router.get('/',checkJwt,usersController.getUser)
//

router.get('/',checkJwt,usersController.getUser)
router.post('/',checkJwt,usersController.createUser)

export default router;