import getDates from './getDates.js';
import getColumns from './getIntervalsForDate/getColumns';
import setHours from 'date-fns/setHours';
import { getIntWithProbability } from './utilities/getRndInteger.js';
import { compose, partial, pipe, andThen } from 'ramda';
import getIntervalsForDateFactory from './getIntervalsForDate.js';
const getIntervalsForDate = getIntervalsForDateFactory(getNumberOfColumns);
import addFurnitureString from './furniture.js';
import getUser from './addPerson';
import addPersons from './addPerson.js';

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
function addRestBasic(sub){

    return (job)=>{
        return {
            ...job,
            sub: sub,//uses gregorianrants4@gmail.com
            charges: {
                hourlyRate: 55,
                fuelCharge: 20,
                travelTime: 30,
            },
            operatives: [{ value: "fenwick" }, { value: "dave" }],
            addresses: [{ value: "19 coral glen" }, { value: "4 craigie avenue" }],
        }
    }

}


async function getData(sub){
    const data = await pipe(
        map(getIntervalsForDate),
        flatten,
        addPersons,
        map(addFurnitureString),
        map(addRestBasic(sub))
    )(getDates())

    return data
}

export default getData;


async function main(){
    const data = await getData()
    console.log(data)
}

if(require.main===module){
    main().catch(console.error)
}