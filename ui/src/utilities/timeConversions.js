const {setHours,setMinutes} = require('date-fns')

function round(value,places){
    return Math.floor(value * 10**places)/10**places
}

function asDecimal(dateTime){
    const hours = dateTime.getHours()
    const fractionOfHour = dateTime.getMinutes()/60
    return round(hours+fractionOfHour,2)
}

const getTimeFromPosition = (position, height) => {
    const asDecimal =  (position / height) * 24
    const hours = Math.floor(asDecimal)
    const minutes = (asDecimal-hours)*60
    return setMinutes(setHours(new Date(),hours),minutes)
}



module.exports = {
    asDecimal,
    getTimeFromPosition
}



