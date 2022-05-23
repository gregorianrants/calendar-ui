import generateAttachment from "./generateAttachement.js";
import sendEmail from "./sendEmail.js";
import sendInvoice from "./index.js";
import fs from "fs"
import { dirname} from 'path';
import path from 'path'
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));


async function testGenerateAttachment(){
    const buf = await generateAttachment({    invoiceNumber: '1',
    customerName: 'gregor murray',
    date: new Date().toLocaleDateString(),
    addresses: '4 craigie avenue\n19 coral glen',
    bill: '£1000000'})

    fs.writeFileSync(path.resolve(__dirname, `../invoices/invoice.docx`), buf);
}

//testGenerateAttachment().catch(console.error)
//sendEmail({attachment: null}).catch()

sendInvoice().catch(console.error)










