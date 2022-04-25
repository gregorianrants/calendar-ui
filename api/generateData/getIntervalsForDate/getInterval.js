const {getRndInteger} = require('../utilities/getRndInteger')

/*
* getInterval takes
* @param {Object[]} previousInterval - represents a time slot e.g. [10,17] is from 10pm to 5pm
* Returns {Object[]|boolean} that represents a non overlapping later time slot or false if time slot can not be found
* ends at a random time on or before @{Number} endLatest
* starts at a time @{number} gap after end of @param {Object[]} previousInterval
* */
function getInterval(previousInterval, startLatest, endLatest, gap){
    if(typeof gap  === 'function'){
        gap = gap()
    }

    const [start,end] = previousInterval
    const newStart = end+gap
    if(newStart>startLatest || newStart+1>endLatest){
        return false
    }
    else return [newStart,getRndInteger(newStart+1,endLatest)]
}

/*returns an interval that starts at time startEarliest
and ends at a random time before endLatest
and after startEarliest*/
function getFirstInterval(startEarliest,endLatest,gap){
    return [startEarliest,getRndInteger((startEarliest+1),endLatest)]
}

/*returns an object with the above 2 fuctions configured with an object to take less parameters*/
function factory({startEarliest=10,startLatest=17, endLatest=19, gap=0}){
    return {
        next: function(previousInterval) {
            return getInterval(previousInterval,startLatest,endLatest,gap)
        },
        first: function(){
            return getFirstInterval(startEarliest,endLatest,gap)
        }
    }
}

module.exports = factory

function main(){
    const settings = {
        startEarliest: 10,
        startLatest: 17,
        endLatest: 19,
        gap: 0
    }

    const {first,next} = factory(settings)

    const firstInterval = first()
    console.log('first: ')
    console.log(firstInterval)
    const nextInterval = next(firstInterval)
    console.log('next: ')
    console.log(nextInterval)


}

if(require.main===module){
    main()
}