const getDates = require('./getDates')
const getColumns = require('./getIntervalsForDate/getColumns')
const setHours = require('date-fns/setHours')
const {getIntWithProbability} = require('./utilities/getRndInteger')
const {compose,partial,pipe,andThen} = require('ramda')
const getIntervalsForDate = require('./getIntervalsForDate')(getNumberOfColumns)
const addFurnitureString = require('./furniture')

const getUser = require('./addPerson')
const addPersons = require("./addPerson");

function getNumberOfColumns(){
    const numColumnsProbability = {
        1: 6,
        2: 2,
        3: 1,
    }
    return getIntWithProbability(numColumnsProbability)
}

function map(F){
    return function (array){
        return array.map(el=>F(el))
    }
}

function flatten(array){
    return array.flat()
}


//TODO this function adds same values for all fields still need to randomise this part
function addRestBasic(job){
    return {
        ...job,
        sub: "google-oauth2|100318194916310076674",//uses gregorianrants4@gmail.com
        charges: {
            hourlyRate: 55,
            fuelCharge: 20,
            travelTime: 30,
        },
        operatives: [{ value: "fenwick" }, { value: "dave" }],
        addresses: [{ value: "19 coral glen" }, { value: "4 craigie avenue" }],
    }
}


async function getData(){
    const data = await pipe(
        map(getIntervalsForDate),
        flatten,
        addPersons,
        map(addFurnitureString),
        map(addRestBasic)
    )(getDates())

    return data
}

module.exports = getData


async function main(){
    const data = await getData()
    console.log(data)
}

if(require.main===module){
    main().catch(console.error)
}