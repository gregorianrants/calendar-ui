import Invoice from '../model/invoice/invoice.js'
import autoCatch from "../lib/autoCatch.js";
import * as sendInvoiceService from '../services/sendInvoice/sendInvoice.js'

async function createInvoice(req, res) {
    const { sub } = req.user;
    let invoice = await Invoice.create(req.body,sub);
    res.status(200).json({
        status: "success",
        data: invoice,
    });
}

async function getInvoices(req,res){
    const { sub } = req.user;
    const { from = undefined, to = undefined, skip=0, limit=1000 } = req.query;
    let data = await Invoice.list({
        from,
        to,
        skip: Number(skip),
        limit: Number(limit),
        sub });

    res.status(200)
        .json({
            status: "success",
            data: data
        });
}

async function sendInvoice(req,res){
    const {sub} = req.user
    const {id} = req.params
    const invoice = await sendInvoiceService.sendInvoice({userId: sub,invoiceId: id})
    res.status(200).json({
        status: "success",
        data: invoice,
    });
}

export default autoCatch({
    createInvoice,
    sendInvoice,
    getInvoices
});
