import Invoice from "../../model/invoice.js";
import composeEmail from "./composeEmail.js";
import sendEmail from "./sendEmail.js";
import * as userModel from "../../model/User.js";
import {getInvoiceCount} from "../../model/invoiceNumbers/invoiceNumbers.js";

export async function sendInvoice({userId,invoiceId}){
    let invoice = await Invoice.get(invoiceId)
    console.log(8,invoice)
    console.log('.................')
    let user = await userModel.get(userId)
    console.log(user)
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
        companyAddress: user.companyAddress
    })

    const email = await sendEmail({
        host: user.emailHost,
        pass: user.emailPassword,
        user: user.email,
        emailComposition
    })

    invoice.status = 'sent'
    invoice = await invoice.save()

    return invoice
}