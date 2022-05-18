import jobObj from "./jobObj.js";
import mongoose from 'mongoose';



function markRequired(obj){
    const result = {...obj}
    return Object.entries(obj).reduce((accum,current)=>{
        const [key,value] = current
        accum[key]={...value,required: true}
        return accum
    },{})
}

const invoiceObj = {
    ...jobObj,
    customer: markRequired(jobObj.customer),
    charges: markRequired(jobObj.charges),
    addresses: {
        ...jobObj.addresses,
        validate: {
            validator: (v) =>v.length>0,
            message: 'you must provide more than one address'
        }
    },
}


export const invoiceSchema = new mongoose.Schema(invoiceObj)

const Invoice = mongoose.model('Invoice',invoiceSchema)





//     const invoice = new Invoice({
//         "start": "2021-09-21T09:18:42.315+00:00",
//         "end": "2021-09-21T12:18:42.315+00:00",
//         "customer": {
//             "name": "Ala",
//             "mobile": 12345,
//             "email": "alan@btinternet.co.uk"
//         },
//         "charges": {
//             "hourlyRate": "five",
//             "fuelCharge": 20,
//             "travelTime": 30
//         },
//         "operatives": [
//             {
//                 "value": "fenwick"
//             },
//             {
//                 "value": "dave"
//             }
//         ],
//         "addresses": [],
//         "items":  "fridge is 5ft \n lawnmower \n"
//     })
//
//     console.log(JSON.stringify(invoice.validateSync(),null,2))
//
//
//
//



