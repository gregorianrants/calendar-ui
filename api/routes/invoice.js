import express from 'express';

const router = express.Router()

import checkJwt from './../authMiddleware/checkJwt.js';
import invoiceController from '../controllers/invoiceController.js'


router
    .post('/:id[:]send-email', (req, res) => {
        res.send('hello world')
    })
    .post("/", checkJwt, invoiceController.createInvoice)


export default router;