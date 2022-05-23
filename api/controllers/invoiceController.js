import AppError from './../errorUtilities/AppError.js';
import Invoice from '../model/invoice.js'
import autoCatch from "../lib/autoCatch.js";

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

export default autoCatch({
    createInvoice
});
