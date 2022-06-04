import mongoose from 'mongoose';
import findOrCreate from 'mongoose-find-or-create'

export const invoiceCountSchema = new mongoose.Schema({
    _id: String,
    count: {type: Number,
    default: 0}
})

invoiceCountSchema.plugin(findOrCreate)

const InvoiceCount = mongoose.model('InvoiceCount',invoiceCountSchema)

export async function getInvoiceCount(id){
    let invoiceCount = await InvoiceCount.findById(id)
    if(!invoiceCount){
        invoiceCount = await InvoiceCount.create({_id: id})
    }
    const result = invoiceCount.count
    invoiceCount.count +=1
    invoiceCount.save()
    return result
}