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

const invoiceObjFront = {
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

const invoiceObj = {
    ...invoiceObjFront,
    jobId: mongoose.Schema.ObjectId,
}



export const invoiceSchema = new mongoose.Schema(invoiceObj)

export const invoiceSchemaFront = new mongoose.Schema(invoiceObjFront)

const Invoice = mongoose.model('Invoice',invoiceSchemaFront)

async function create(data, sub) {
    let invoice = new Invoice({ ...data, sub });
    await invoice.save(); //TODO add some validation start must be before end
    return invoice;
}

async function list({ from, to, skip, limit, sub }) {
    const filter = {}
    if(from) filter.start = { $gte: from }
    if(to) filter.end = { $lte: to }
    filter.sub = sub
    const query  = Job
        .find(filter)

    const count = await Invoice.countDocuments(filter)
    console.log(count)
    if((typeof skip!=='undefined') && (typeof limit!=='undefined')){
        query.limit(Number(limit))
            .skip(Number(skip))
    }
    let items = await query;
    return {items,
        pagination: getPagination(skip,limit,count),
        count: items.length
    };
}


export default {
    create,
    list,
}


