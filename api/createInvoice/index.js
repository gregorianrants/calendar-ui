import generateAttachment from './generateAttachement.js'
import sendEmail from './sendEmail.js'

export default async function sendInvoice(){
    const attachment = await generateAttachment({    invoiceNumber: '1',
        customerName: 'gregor murray',
        date: new Date().toLocaleDateString(),
        addresses: '4 craigie avenue\n19 coral glen',
        bill: '£1000000'})

    await sendEmail({attachment})

}