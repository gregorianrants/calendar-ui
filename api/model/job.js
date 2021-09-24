const mongoose = require('mongoose')
const cuid = require("cuid");
/*const addGcalEvent = require('./../googleCalendar')*/

const setHours = require('date-fns/setHours')


const addressSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: cuid
    },
    value: {
        type: String,
    }
})

const operativesSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: cuid
    },
    value: {
        type: String,
    }
})

const chargesSchema = new mongoose.Schema(
    {
        hourlyRate: {type: Number},
        fuelCharge: {type: Number},
        travelTime: {type: Number},}
)

const jobSchema = new mongoose.Schema({
    _id: {
      type: String,
      default: cuid
    },
    start: {
        type: Date,
        required: true,
    },
    end:  {
        type: Date,
        required: true,
    },
    customer: {
        name: {
            type: String,
            validate: {
                validator: (v)=> {
                    console.log('v',v)
                    return (v.length > 4)
                },
                message: `name must have more than 4 characters`
            }
        },
        mobile: {type: String},
        email: {type: String},
    },
    charges: chargesSchema,
    operatives: [operativesSchema],
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
    edit,
    jobSchema
}






exports.Job = Job
