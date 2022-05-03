import intervalToDuration from 'date-fns/intervalToDuration';
import add from 'date-fns/add';
const mediumItems = ['chest of drawers', 'desk', 'bedside cabinet', 'chair', 'cooker' ,'washing machine']

const largeItems = ['wardrobe', '2 seater couch', 'fridge freezer', '3 seater Couch']

const bitsAndPieces = ['lamp','hoover','ironing board','mop','surfboard','bike','toolbox','fuzzball','beer fridge']

// [large,medium,small,boxes]

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function getRandomElement(array){
    const lastIndex = array.length-1
    const index = getRndInteger(0,lastIndex)
    return array[index]
}

function getCounts(list,number){
    const counts ={}
    for (let i=0; i<number; i++){
        const item = getRandomElement(list)
        if (counts[item]){
            counts[item]+=1
        }
        else{
            counts[item] = 1
        }
    }
    return counts
}

function formatCounts(countsObj){
    const lines =  Object.entries(countsObj).map(([key,value])=>(
        key + ' *' + String(value)
    ))

    return lines.join('\n')
}

function numberOfLargeItems(hours){


}

function getItems(hours,list,multiplier){
    const numItems = hours * multiplier
    const counts = getCounts(list,numItems)
    return formatCounts(counts)
}

function getMultiplier(min,max){
    return getRndInteger(min,max)
}

// const hours = 2
// const largeItemsString = getItems(hours,largeItems,getMultiplier(0,2))
// const mediumItemsString = getItems(hours,mediumItems,getMultiplier(3,5))
// const bitsAndPiecesString = getItems(hours,bitsAndPieces,getMultiplier(2,5))

function getBagsAndBoxes(hours){
    return getRndInteger(3,5)*hours + ' bags and boxes'
}

function makeFurnitureString(hours){
   return (
    [getItems(hours,largeItems,getMultiplier(0,2)),
    getItems(hours,mediumItems,getMultiplier(3,5)),
    getItems(hours,bitsAndPieces,getMultiplier(2,5)),
    getBagsAndBoxes(hours)]
        .join('\n')
   )
}

function addFurnitureString(job){
    const {start,end} = job
    let {hours,minutes} = (intervalToDuration({start,end}))
    hours = Math.floor(hours + (minutes/60))

    return {...job,
    items: makeFurnitureString(hours)
    }
}


export default addFurnitureString;

function main(){
    console.log(makeFurnitureString(5))

    const testJob = {start: new Date(),end: add(new Date(),{hours: 1, minutes: 40})}

    console.log(addFurnitureString(testJob))

}

if(require.main===module){
main()
}




