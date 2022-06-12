import express from 'express';

const router = express.Router()

import checkJwt from './../authMiddleware/checkJwt.js';
import invoiceController from '../controllers/invoiceController.js'


router
    .post('/:id[:]send-email',checkJwt,invoiceController.sendInvoice)
    .post("/", checkJwt, invoiceController.createInvoice)
    .get('/',checkJwt,invoiceController.getInvoices)
    .patch('/:id',checkJwt,invoiceController.updateInvoice)


export default router;