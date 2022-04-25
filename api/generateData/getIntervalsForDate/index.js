const {getIntWithProbability} = require("../utilities/getRndInteger");
const setHours = require("date-fns/setHours");
const getColumns = require(".//getColumns");
const {curry} = require("ramda");
let setMinutes = require('date-fns/setMinutes')



function toDateIntervalObject(timeIntervalArray,date){
    const [start,end] = timeIntervalArray
    return {
        start: setMinutes(setHours(date,start),0),
        end: setMinutes(setHours(date,end),0)
    }
}

//console.log(toDateIntervalObject([3,5], new Date()))

// function getIntervalsFactory(getNumberOfColumnsF){
//
//     function getIntervals(date,numberOfColumns){
//         const intervals = getColumns(numberOfColumns)
//         return intervals.map(el=> (
//             toDateIntervalObject(el,date)
//         ))
//     }
//
//     return function (date){
//         const numberOfColumns = getNumberOfColumnsF()
//         return getIntervals(date,numberOfColumns)
//     }
// }

function getIntervals(numberOfColumnsF,date){
        const intervals = getColumns(numberOfColumnsF())  || 2
        return intervals.map(el=> (
            toDateIntervalObject(el,date)
        ))
    }

module.exports = curry(getIntervals)


