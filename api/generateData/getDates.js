const sub = require('date-fns/sub')
const add = require('date-fns/add')
const nextDay = require('date-fns/nextDay')
const isWeekend = require('date-fns/isWeekend')
const nextMonday = require('date-fns/nextMonday')
const isAfter = require('date-fns/isAfter')
var addDays = require('date-fns/addDays')
var getDay = require('date-fns/getDay')

function getStartDate(){
    const startDate = sub(new Date(),{months: 1})
    if (isWeekend(startDate)){
        return nextMonday(startDate)
    }
    return startDate
}

function getEndDate(){
    const endDate = add(new Date(),{months: 1})
    if (isWeekend(endDate)){
        return nextMonday(endDate)
    }
    return endDate
}

function getLastEl(array){
    return array[array.length-1]
}

function nextEl(previousDay){
    if(isWeekend(addDays(previousDay,1))){
       return nextMonday(previousDay)
    }
    return addDays(previousDay,1)
}

function finished(datesArray){
    const next = nextEl(getLastEl(datesArray))
    if (isAfter(next,getEndDate())){
        return true
    }
    return false
}

function getDates(){
    function inner(datesArray){
        if(finished(datesArray)){
            return datesArray.map(el=>new Date(el))
        }
        return inner([...datesArray,nextEl(getLastEl(datesArray))])
    }

    return inner([getStartDate()])
}

module.exports = getDates

function main(){
    const array = getDates()
    console.log('dates array')
    console.log(array)
    console.log('length')
    console.log(array.length)
    console.log('mapped to days')
    console.log(array.map(el=>getDay(el)))

}

if(require.main===module){
    main()
}




