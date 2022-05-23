import generateAttachment from './generateAttachement.js'
import sendEmail from './sendEmail.js'

export default async function sendInvoice({invoiceNumber=1,
                                              customerName,
                                              date,
                                              addresses,
                                              bill
                                          }) {
    const attachment = await generateAttachment({
        invoiceNumber,
        customerName,
        date,
        addresses,
        bill
    })

    await sendEmail({attachment})

}