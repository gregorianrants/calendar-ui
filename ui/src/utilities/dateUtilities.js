import {setHours, setMinutes} from "date-fns";

const {addDays,format,nextMonday,isSameDay} = require("date-fns");

export function mondayIndexed(sundayIndexed) {
    return sundayIndexed === 0 ? 6 : sundayIndexed - 1
}

export function weekIndex(date) {
    return mondayIndexed(date.getDay())
}

/*
function currentDateTime() {
    return add(new Date(), {minutes: new Date().getTimezoneOffset() * -1})
}
*/

export function weekContaining(date) {
    const daysOfWeek = [0, 1, 2, 3, 4, 5, 6]
    const difference = daysOfWeek.map(day => day - weekIndex(date))
    return difference.map(diff => addDays(date, diff))
}

export function dayOfWeek(date){
    return format(date,'iii')
}

export function monthAndYear(date){
    return `${format(date,'MMM')} ${format(date,'yyyy')}`
}

export function previousMonday(date){
    const result =nextMonday(addDays(date,-7))
    result.setHours(0)
    result.setMinutes(0)
    return result
}

export const fitsInWeek=(firstDayOfWeek,date)=>{
    const endOfWeek = addDays(firstDayOfWeek,7)
    if (isSameDay(firstDayOfWeek,date) || isSameDay(endOfWeek,date)){
        return true
    }
    return (date >=firstDayOfWeek && date <=endOfWeek)
}

export const mergeDateAndTime = (date,time)=>{
    const hours = time.getHours()
    const minutes = time.getMinutes()
    return setMinutes(setHours(date,hours),minutes)
}

export function setTimeDayStart(date){
    return setMinutes(setHours(date,0),0)
}

export function setTimeDayEnd(date){
    return setTimeDayStart(addDays(date,1))
}

const defaultExports = {
    weekContaining,
    dayOfWeek,
    monthAndYear,
    addDays,
    previousMonday,
    fitsInWeek,
    mergeDateAndTime,
    startOfDay: setTimeDayStart,
    endOfDay: setTimeDayEnd
}

export default defaultExports