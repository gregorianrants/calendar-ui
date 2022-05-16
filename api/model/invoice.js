import {jobSchema} from "./job.js";

function markRequired(obj){
    const result = {...obj}
    return Object.entries(obj).reduce((accum,current)=>{
        const [key,value] = current
        accum[key]={...value,required: true}
        return accum
    },{})
}

//impure function
function pickPath(path){
    return jobSchema.obj[path].obj
}

const customerObj = markRequired(pickPath('customer'))

const chargesObj = markRequired(pickPath('charges'))

console.log(jobSchema.obj.addresses)





