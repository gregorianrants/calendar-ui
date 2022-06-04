import Invoice from "../../model/invoice.js";
import generateAttachment from "./generateAttachement.js";
import sendEmail from "./sendEmail.js";
import usersService from "../usersService.js";
import {getInvoiceCount} from "../../model/invoiceNumbers/invoiceNumbers.js";

export default async function sendInvoice({userId,invoiceId}){
    let invoice = await Invoice.get(invoiceId)
    console.log(8,invoice)
    console.log('.................')
    let user = await usersService.getUser(userId)
    console.log(user)
    invoice.status = 'sending'
    invoice = await invoice.save()
    const invoiceCount = await getInvoiceCount(userId)

    const attachment = await generateAttachment({
        invoiceNumber: invoiceCount,
        customerName: invoice.customer.name,
        date: invoice.start,
        collectionAddress: invoice.addresses[0].value,
        bill: invoice.bill,
        companyName: user.companyName,
        companyAddress: user.companyAddress
    })

    const email = await sendEmail({
        pass: user.emailPassword,
        user: user.email,
        attachment
    })

    invoice.status = 'sent'
    invoice = await invoice.save()

    return invoice
}