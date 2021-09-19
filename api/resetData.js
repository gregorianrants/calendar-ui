require('dotenv').config()

console.log(process.env.DB_PASSWORD)
require('./model/db')
let Job = require('./model/job')
let fs = require('fs/promises')
const cuid = require("cuid");

const {addDays} =require("date-fns");

function wrapInObject(el){
    return {
        value: el,
        id: cuid()
    }
}



const jobs =    [
    {
        "start": new Date().setHours(10),
        "end": new Date().setHours(13),
        customer: {
            name: "Alan Murray",
            mobile: "07930103787",
            email: 'alan@btinternet.co.uk',
        },
        charges: {
          hourlyRate: 55,
          fuelCharge: 20,
          travelTime: 30,
        },
        operatives: ['fenwick','dave'],
        addresses: [
            {value: '19 coral glen'},
            {value: '4 craigie avenue'}],
        items: ['fridge is 5ft',
            'sent list as photo so can paste in',
            'lawnmower',
            'fridge 5ft',
           ' strimmer',
           ' 2 rugs',
            'black bag',
            '2 vacuam bags',
            'excercise mat',
            'xmas tree',
            '4 suits in bags',
            'coff table',
            '8 boxes',
            'prety chunky weights bench',
            'bike',
            'rucksack']
    },
        {
            "start": new Date().setHours(12),
            "end": new Date().setHours(14),
            customer: {
                name: "Alan Murray",
                mobile: "07930103787",
                email: 'alan@btinternet.co.uk',
            },
            charges: {
                hourlyRate: 55,
                fuelCharge: 20,
                travelTime: 30,
            },
            operatives: ['fenwick','dave'],
            addresses: [
                {value: '19 coral glen'},
                {value: '4 craigie avenue'}],
            items: ['fridge is 5ft',
                'sent list as photo so can paste in',
                'lawnmower',
                'fridge 5ft',
                ' strimmer',
                ' 2 rugs',
                'black bag',
                '2 vacuam bags',
                'excercise mat',
                'xmas tree',
                '4 suits in bags',
                'coff table',
                '8 boxes',
                'prety chunky weights bench',
                'bike',
                'rucksack']
        },
        {
            "start": new Date().setHours(14),
            "end": new Date().setHours(16),
            customer: {
                name: "Alan Murray",
                mobile: "07930103787",
                email: 'alan@btinternet.co.uk',
            },
            charges: {
                hourlyRate: 55,
                fuelCharge: 20,
                travelTime: 30,
            },
            operatives: ['fenwick','dave'],
            addresses: [
                {value: '19 coral glen'},
                {value: '4 craigie avenue'}],
            items: ['fridge is 5ft',
                'sent list as photo so can paste in',
                'lawnmower',
                'fridge 5ft',
                ' strimmer',
                ' 2 rugs',
                'black bag',
                '2 vacuam bags',
                'excercise mat',
                'xmas tree',
                '4 suits in bags',
                'coff table',
                '8 boxes',
                'prety chunky weights bench',
                'bike',
                'rucksack']
        },
        {
            "start": addDays(new Date().setHours(14),1),
            "end":  addDays(new Date().setHours(16),1),
            customer: {
                name: "Alan Murray",
                mobile: "07930103787",
                email: 'alan@btinternet.co.uk',
            },
            charges: {
                hourlyRate: 55,
                fuelCharge: 20,
                travelTime: 30,
            },
            operatives: ['fenwick','dave'],
            addresses:  [
                {value: '19 coral glen'},
                {value: '4 craigie avenue'}],
            items: ['fridge is 5ft',
                'sent list as photo so can paste in',
                'lawnmower',
                'fridge 5ft',
                ' strimmer',
                ' 2 rugs',
                'black bag',
                '2 vacuam bags',
                'excercise mat',
                'xmas tree',
                '4 suits in bags',
                'coff table',
                '8 boxes',
                'prety chunky weights bench',
                'bike',
                'rucksack']
        }
    ]

/*
fs.readFile('./api/jobs.json')
    .then(data=>JSON.parse(data))
    .then(data=>{
        Job.resetData(data)
            .catch(err=>{console.log(err)})
    })
*/

Job.resetData(jobs)
    .catch(err=>{console.log(err)})


