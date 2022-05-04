import express from 'express';
const router = express.Router()
import gcalController from '../controllers/gcalController.js';
import checkJwt from './../authMiddleware/checkJwt.js';




router.get('/url',gcalController.getUrl)
router.get('/authourize',checkJwt,gcalController.authorizeUser)
router.get('/events',checkJwt,gcalController.getJobs)
router.get('/check-auth',checkJwt,gcalController.checkAuth)
router.get('/revoke-auth',checkJwt,gcalController.revokeAuth)


export default router;
