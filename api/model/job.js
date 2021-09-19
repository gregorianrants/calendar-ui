const mongoose = require('mongoose')
const cuid = require("cuid");
/*const addGcalEvent = require('./../googleCalendar')*/



const addressSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: cuid
    },
    value: {
        type: String,
    }
})



const jobSchema = new mongoose.Schema({
    start: Date,
    end: Date,
    customer: {
        name: String,
        mobile: Number,
        email: String,
    },
    charges: {
        hourlyRate: Number,
        fuelCharge: Number,
        travelTime: Number,
    },
    operatives: [],
    items: [],
    addresses: [addressSchema]
})

let Job =  mongoose.model('Job',jobSchema,'jobs')

async function list({from,to}){
    let data = await Job.find({
        start: {$gte: from},
        end: {$lte: to}
    })
    return data
}

async function create(data){
    let job = new Job(data)
    await job.save()//TODO add some validation start must be before end
    return job
}

async function get(id){
    const job = await Job.findById(id)
    return job
}

async function remove(id){
    let data = await Job.deleteOne({'_id': id})
    return data
}

async function edit (_id, change) {
    const product = await get(_id)
    Object.keys(change).forEach(function (key) {
        product[key] = change[key]
    })
    await product.save()
    return product
}


async function resetData(data){
    await Job.deleteMany()
    console.log(data)
    await Job.insertMany(data)
}

module.exports = {
    list,
    create,
    get,
    remove,
    resetData,
    edit
}






exports.Job = Job
