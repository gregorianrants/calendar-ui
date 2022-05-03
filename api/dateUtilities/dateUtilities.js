

import { addDays, add, format, nextMonday } from 'date-fns';

function mondayIndexed(sundayIndexed) {
    return sundayIndexed === 0 ? 6 : sundayIndexed - 1
}

function weekIndex(date) {
    //returns index of day within week where week starts with index 0
    return mondayIndexed(date.getDay())
}

function currentDateTime() {
    return add(new Date(), {minutes: new Date().getTimezoneOffset() * -1})
}

function weekContaining(date) {
    const daysOfWeek = [0, 1, 2, 3, 4, 5, 6]
    const difference = daysOfWeek.map(day => day - weekIndex(date))
    return difference.map(diff => addDays(date, diff))
}

function weekBoundaries(date){
    return {'monday': weekContaining(date)[0], 'sunday': weekContaining(date)[6]}
}

function dayOfWeek(date){
    return format(date,'iii')
}

function monthAndYear(date){
    return `${format(date,'MMM')} ${format(date,'yyyy')}`
}

function previousMonday(date){
    return nextMonday(addDays(date,-7))
}

//console.log(dayOfWeek(new Date()))

//console.log(monthAndYear(new Date()))

export default {
    currentDateTime,weekContaining,dayOfWeek,monthAndYear,weekBoundaries,addDays,previousMonday
};

