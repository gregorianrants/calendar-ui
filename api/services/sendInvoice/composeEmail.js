import PizZip from "pizzip"
import Docxtemplater from "docxtemplater"

import { promises as fsPromises } from 'fs'
import { dirname} from 'path';
import path from 'path'
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load the docx file as binary content


// buf is a nodejs Buffer, you can either write it to a
// file or res.send it with express for example.

async function generateAttachment({invoiceNumber,
                            customerName,
                            date,
                            collectionAddress,
                            bill,
                            companyName,
                            companyAddress
                                                 }){
    const content = await fsPromises.readFile(
        path.resolve(__dirname, "invoice-template.docx"),
        "binary"
    );

    const zip = new PizZip(content);

    const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
    });

    console.log(typeof doc)

// Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
    doc.render({    invoiceNumber,
        customerName,
        date,
        collectionAddress,
        bill,
        companyName,
        companyAddress
    });

    const buf = doc.getZip().generate({
        type: "nodebuffer",
        // compression: DEFLATE adds a compression step.
        // For a 50MB output document, expect 500ms additional CPU time
        compression: "DEFLATE",
    });

    return buf

    //fs.writeFileSync(path.resolve(__dirname, `../invoices/invoice${invoiceNumber}.docx`), buf);
}

function createBody({companyName,customerName}){
    return (
        `
Dear ${customerName},
        
Thank you for using ${companyName}, please find your invoice attached.
        
Best wishes from ${companyName}
        `
    )
}

function createSubject({companyName, invoiceNumber}){
    return (
        `${companyName} invoice number ${invoiceNumber}`
    )
}


export default async function composeEmail({invoiceNumber,
                          customerName,
                          date,
                          collectionAddress,
                          bill,
                          companyName,
                          companyAddress
                      }){

    const attachment = await generateAttachment({invoiceNumber,
        customerName,
        date,
        collectionAddress,
        bill,
        companyName,
        companyAddress
    })


    return {
        from: '"invoice" <invoice@gregorianrants.co.uk>', // sender address
        to: "gregorian_rants@hotmail.com", // list of receivers
        subject: createSubject({companyName, invoiceNumber}), // Subject line
        text: createBody({companyName,customerName}), // plain text body
        //html: "<b>Hello world?</b>", // html body
        attachments: [
            {filename: 'invoice.docx',
                content: attachment
            }
        ]
    }

}
