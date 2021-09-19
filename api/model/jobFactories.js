

const mongoose = require('mongoose/browser')
const cuid = require("cuid");
/*const addGcalEvent = require('./../googleCalendar')*/
var equal = require('deep-equal');

const cloneDeep = require('lodash/cloneDeep')

const setHours = require('date-fns/setHours')


const {jobSchema} = require('./job')

function createStart() {
    return setHours(new Date(), 10)
}

function createEnd() {
    return setHours(new Date(), 10)
}

function propertiesOnSchema(originalObj,schema){
    console.log('orig',originalObj)
    const doc = new mongoose.Document(cloneDeep(originalObj),schema)
    const {_id,...rest} = doc.toObject()
    console.log('orig',originalObj)
    console.log('rest',rest)
    return equal(rest,originalObj)
}

function getInitialValues(){
    const obj = new mongoose.Document({},jobSchema).toObject()
    const {_id,...rest} = obj
    return rest
}

function createJob(
    {start=createStart(), end=createEnd()},
    {name=null, mobile=null, email=null},
    {hourlyRate=null, fuelCharge=null, travelTime=null},
    {operatives = [], items = [], addresses = []}
) {
    const job = {
        start,
        end,
        customer: {
            name,mobile,email
        },
        charges: {
            hourlyRate,fuelCharge,travelTime
        },
        operatives,
        items,
        addresses
    }
    return job
}


const job = createJob({},{},{},
    {})

console.log(job)


console.log(propertiesOnSchema(job,jobSchema))

module.exports = {getInitialValues}



