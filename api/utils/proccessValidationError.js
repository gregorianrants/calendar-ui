import { produce } from 'immer';

const err = {
    "errors": {
    "charges.hourlyRate": {
        "stringValue": "\"five\"",
            "valueType": "string",
            "kind": "Number",
            "value": "five",
            "path": "hourlyRate",
            "reason": {
            "generatedMessage": true,
                "code": "ERR_ASSERTION",
                "actual": false,
                "expected": true,
                "operator": "=="
        },
        "name": "CastError",
            "message": "Cast to Number failed for value \"five\" (type string) at path \"hourlyRate\""
    },
    "customer.name": {
        "name": "ValidatorError",
            "message": "name must have more than 4 characters",
            "properties": {
            "message": "name must have more than 4 characters",
                "type": "user defined",
                "path": "customer.name",
                "value": "Ala"
        },
        "kind": "user defined",
            "path": "customer.name",
            "value": "Ala"
    }
},
    "_message": "Job validation failed",
    "name": "ValidationError",
    "message": "Job validation failed: charges.hourlyRate: Cast to Number failed for value \"five\" (type string) at path \"hourlyRate\", customer.name: name must have more than 4 characters"
}

function processError(err){
    const result = produce(err,draft=>{
        const errors = draft['errors']
        const keys = Object.keys(errors)

        keys.forEach(key=>{
            const error =  errors[key]

            const name = error['name']

            if (name ==='CastError'){
                error['message']=`You entered a ${error['valueType']} should have entered ${error['kind'].toLowerCase()}`
            }

        })

    })

    return result

}

console.log(processError(err))



