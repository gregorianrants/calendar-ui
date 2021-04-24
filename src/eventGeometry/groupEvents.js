function idGenerator() {
    let id = 0
    return () => id++
}

let id = idGenerator()

export function TimePeriod(start, end) {
    this.start = start;
    this.end = end;
    this.id = id();
}

/*let events = [
    new TimePeriod(10, 13.5),
    new TimePeriod(10.5, 11.5),
    new TimePeriod(13, 14),
    new TimePeriod(16, 17),
    new TimePeriod(15.5, 16.5),
    new TimePeriod(21,23)
]*/



/*let groups = events.map(event => [event])*/

function getStart(set) {
    return set.map(event => event.start).reduce((a, b) => Math.min(a, b))
}

function getEnd(set) {
    return set.map(event => event.end).reduce((a, b) => Math.max(a, b))
}

function asPeriod(set) {
    return new TimePeriod(getStart(set), getEnd(set))
}

function overlaps(period1, period2) {
    return period1.start < period2.end && period2.start < period1.end
}

function negate(f){
    return (...args)=>{
        return !f(...args)
    }
}


/*
function sortAscending(arr) {
    return [...arr].sort((a, b) => a - b)
}
*/

function sortAscending(arr) {
    return [...arr].sort((a, b) => a.start - b.start)
}


function difference(arrayA, arrayB) {
    let ids = arrayA.map(event => event.id)
    return arrayB.filter(event => !ids.includes(event.id))
}


function extractSet(periods, condition) {
    return (
        sortAscending(periods)
            .reduce(
                (set, period) => set.length === 0 || condition(period, asPeriod(set)) ? [...set, period] : set
                , [])
    )
}

function extractSetWith(condition){
    return (periods)=>{
        return extractSet(periods,condition)
    }
}

function buildSets(periods, extractionF, sets = []) {
    if (periods.length === 0) return sets
    let set = extractionF(periods)
    return buildSets(
        difference(set, periods),
        extractionF,
        [...sets, set])
}

function buildSetsWith(extractionF){
    return (periods)=>{
        return buildSets(periods,extractionF,[])
    }
}



export default function groupEvents(events){

    let overlappingSets = buildSetsWith(extractSetWith(overlaps))(events)

    let withColumns = overlappingSets.map(set=>{
        return buildSetsWith(extractSetWith(negate(overlaps)))(set)
    })
    return withColumns
}



//console.log(overlappingSets)

/*
console.log(JSON.stringify(withColumns,null, 2))*/
