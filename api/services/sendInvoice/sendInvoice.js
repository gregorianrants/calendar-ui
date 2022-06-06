import Invoice from "../../model/invoice/invoice.js";
import composeEmail from "./composeEmail.js";
import sendEmail from "./sendEmail.js";
import * as userModel from "../../model/User.js";
import {getInvoiceCount} from "../../model/invoiceNumbers/invoiceNumbers.js";

export async function sendInvoice({userId,invoiceId}){
    let invoice = await Invoice.get(invoiceId)
    //console.log(8,invoice)
    //console.log('.................')
    let user = await userModel.get(userId)
    //console.log(user)
    invoice.status = 'sending'
    invoice = await invoice.save()
    const invoiceCount = await getInvoiceCount(userId)

    const emailComposition = await composeEmail({
        invoiceNumber: invoiceCount,
        customerName: invoice.customer.name,
        date: invoice.start,
        collectionAddress: invoice.addresses[0].value,
        bill: invoice.bill,
        companyName: user.companyName,
        companyAddress: user.companyAddress,
        from: process.env.EMAIL_ADDRESS,
        replyTo: user.email
    })

    console.log('asdfsdf',emailComposition)

    const email = await sendEmail({
        host: process.env.EMAIL_HOST,
        pass: process.env.EMAIL_PASSWORD,
        user: process.env.EMAIL_ADDRESS,
        emailComposition
    })

    invoice.status = 'sent'
    invoice = await invoice.save()

    return invoice
}