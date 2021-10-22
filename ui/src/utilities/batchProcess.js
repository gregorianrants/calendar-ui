function addBatchNumber(arr,number){
    return arr.map(obj=>({...obj,batch: number}))
}

function removeBatchProp(obj){
    const {batch ,...rest} = obj;
    return rest
}

function removeBatchProps(arr){
    return arr.map(obj=>removeBatchProp(obj))
}



export function batchProcess(array1,array2,f){
    //TODO check objects dont already have a batch prop

    const result = f([...addBatchNumber(array1,1),...addBatchNumber(array2,2)])
    const batch1 = result.filter(obj=>obj.batch===1)
    const batch2 = result.filter(obj=>obj.batch===2)



    return [removeBatchProps(batch1),removeBatchProps(batch2)]
}

/*
const one = [{name: 'gregor'},{name: 'gregor'}]
const two = [{name: 'jimmy'}]

function f(arr){
    return arr.map(obj=> ({...obj,name: obj.name.toUpperCase()}))
}


console.log(batchProcess(one,two,f))
*/
