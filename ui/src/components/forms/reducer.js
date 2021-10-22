export function rootReducer(draft,action){
    const {type,payload} = action
   if(type==='ITEM CHANGE'){
           draft[payload.field] = payload.value
   }
   if(type==='GROUP CHANGE'){
       draft[payload.group][payload.field] = payload.value
   }
}

