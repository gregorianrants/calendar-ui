const {getRndInteger} = require('../utilities/getRndInteger')
const getIntervalFactory = require('./getInterval')

function gap(){
    return getRndInteger(0,2)
}
const getInterval = getIntervalFactory({gap})

function getLastItem(array) {
    return array[array.length - 1]
}

// const intervals = [getInterval.first()]
//
// function getColumn(intervals){
//     const previousInterval = getLastItem(intervals)
//     const next = getInterval.next(previousInterval)
//     if(!next) return intervals
//     return getColumn([...intervals,next])
// }
//
// function getIntervalsForDate(){
//
// }
//
// console.log(getColumn(intervals))
function getColumn(){
    function inner(intervals){
        const previousInterval = getLastItem(intervals)
        const next = getInterval.next(previousInterval)
        if(!next) return intervals
        return inner([...intervals,next])
    }
    return inner([getInterval.first()])
}

module.exports = getColumn

function main(){
    console.log(getColumn())
    console.log(getColumn())
    console.log(getColumn())
}

if(require.main===module){
    main()
}
