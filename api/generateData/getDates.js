import sub from 'date-fns/sub';
import add from 'date-fns/add';
import nextDay from 'date-fns/nextDay';
import isWeekend from 'date-fns/isWeekend';
import nextMonday from 'date-fns/nextMonday';
import isAfter from 'date-fns/isAfter';
import addDays from 'date-fns/addDays';
import getDay from 'date-fns/getDay';

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

export default getDates;

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




