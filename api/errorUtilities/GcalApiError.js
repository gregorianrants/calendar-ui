import {cloneDeep} from 'lodash-es'



class GcalApiError extends Error {
    constructor(error) {
        super(error.message)
        this.response = {
            ...cloneDeep(error.response),
        }
        Error.captureStackTrace(this, this.constructor);
    }
}

export default GcalApiError

