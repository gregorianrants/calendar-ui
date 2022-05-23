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

export default async function generateAttachment({    invoiceNumber,
                            customerName,
                            date,
                            addresses,
                            bill}){
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
        addresses,
        bill});

    const buf = doc.getZip().generate({
        type: "nodebuffer",
        // compression: DEFLATE adds a compression step.
        // For a 50MB output document, expect 500ms additional CPU time
        compression: "DEFLATE",
    });

    return buf

    //fs.writeFileSync(path.resolve(__dirname, `../invoices/invoice${invoiceNumber}.docx`), buf);
}

// generateAttachment({    invoiceNumber: '1',
//     customerName: 'gregor murray',
//     date: new Date().toLocaleDateString(),
//     addresses: '4 craigie avenue\n19 coral glen',
//     bill: '£1000000'})


