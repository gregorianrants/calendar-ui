import AppError from './../errorUtilities/AppError.js';
import Invoice from '../model/invoice.js'
import autoCatch from "../lib/autoCatch.js";
import emailInvoice from "../createInvoice/index.js";
//import Job from "../model/job";

async function createInvoice(req, res) {
    const { sub } = req.user;
    console.log('22', sub)
    let invoice = await Invoice.create(req.body,sub);
    //notify()
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

    let invoice = await Invoice.get(id)

   await emailInvoice(invoice)

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
