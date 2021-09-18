function customerReducer(state,action){
    const {type,payload} = action
    switch(type){
        case "CUSTOMER/INPUT":
           return{
                ...state,
                [payload.field]: payload.value
            }
        default:
            return state;
    }
}

function chargesReducer(state,action){
    const {type,payload} = action
    switch(type){
        case "CHARGES/INPUT":
            return {
                ...state,
                [payload.field]: payload.value
            }
        default:
            return state;
    }
}

function dateTimeFromInput(date, time) {
    const hours = time.getHours()
    const minutes = time.getMinutes()
    let res = new Date(date)
    res.setHours(hours)
    res.setMinutes(minutes)
    return res
}

export function rootReducer(state,action){
   if(action.type==='START/INPUT'){
       return {
           ...state,
           start: dateTimeFromInput(state.start,
               action.payload.value)
       }
   }
   else if(action.type==='END/INPUT') {
       return {
           ...state,
           end: dateTimeFromInput(state.end,
               action.payload.value)
       }
   }
   else if(action.type==='DATE/INPUT'){
       return {
           ...state,
           start: dateTimeFromInput(action.payload.value,
               state.start),
           end: dateTimeFromInput(action.payload.value,
               state.end)
       }
   }
   else{
       return {
           customer: customerReducer(state.customer,action),
           charges: chargesReducer(state.charges,action)
       }
   }
}

