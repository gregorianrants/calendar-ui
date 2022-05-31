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
    bill: {...jobObj.bill, required: true},
    void: {type: Boolean,
    default: false
    },
    status: {
        type: String,
        default: 'created',
        enum: ['created','sending','sent']
    },
    addresses: {
        ...jobObj.addresses,
        validate: {
            validator: (v) =>v.length>0,
            message: 'you must provide more than one address'
        }
    },
}

// const invoiceObj = {
//     ...invoiceObjFront,
//     jobId: mongoose.Schema.ObjectId,
// }

const invoiceObj = {
    ...invoiceObjFront,
    job: {type: mongoose.Schema.Types.ObjectId, ref: 'Job'}
}



export const invoiceSchema = new mongoose.Schema(invoiceObj,{timestamps: true})





export const invoiceSchemaFront = new mongoose.Schema(invoiceObjFront)

const Invoice = mongoose.model('Invoice',invoiceSchema)

async function create(data, sub) {
    let invoice = new Invoice({ ...data, sub });
    await invoice.save(); //TODO add some validation start must be before end
    return invoice;
}

function getPagination(skip,limit,count){
    return{
        from: skip +1,
        to: Math.min(skip + limit,count),
        of: count
    }
}

async function list({ from, to, skip, limit, sub }) {
    const filter = {}
    if(from) filter.start = { $gte: from }
    if(to) filter.end = { $lte: to }
    filter.sub = sub
    const query  = Invoice
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

async function get(id) {
    const invoice = await Invoice.findById(id);
    return invoice;
}


export default {
    create,
    list,
    get
}


