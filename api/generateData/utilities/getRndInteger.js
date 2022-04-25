function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function arrayOfLength(n){
    return Array.from(Array(n))
}

function forN(n,f){
    return arrayOfLength(n).forEach(f)
}


function getIntWithProbability(dist){
    const items = []
    Object.entries(dist).forEach(([value,probability])=>{
        forN(probability,()=>{items.push(value)})
    })
    const lastIndex = items.length-1
    const index = getRndInteger(0,lastIndex)
    return items[index]
}
//shape value:relativeProbability

function main(){
    const dist = {
        1: 1,
        2: 4,
        3: 6
    }

    console.log(getIntWithProbability(dist))
}




if(require.main===module){
    main()
}

module.exports = {getRndInteger,getIntWithProbability}