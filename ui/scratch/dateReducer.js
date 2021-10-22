import {addWeeks,nextMonday,nextSunday,addDays} from "date-fns";


function mapWeek(evnts){
    const weekMap = new Map()
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    days.forEach(day=>weekMap.set(day,[]))

   evnts.forEach(evnt=>{
       const {date} = evnt;
       const day = days[date.getDay()]
       weekMap[day].push(evnt)
   })
    return weekMap
}

function weekReducer(state,action){
    const {offset,startWeek,endWeek}= state
    switch (action.type){
        case "THIS_WEEK":
            return{
                ...state,
                offset: 0,
                startWeek: addWeeks(nextMonday(new Date()),-7),
                endWeek: nextSunday(new Date())
            }
        case "NEXT_WEEK":
            return{
                ...state,
                offset: offset+1,
                startWeek: addWeeks(startWeek,1),
                endWeek: addWeeks(endWeek,1),
            }
        case "PREVIOUS_WEEK":
            return{
                ...state,
                offset: offset-1,
                startWeek: addWeeks(startWeek,-1),
                endWeek: addWeeks(endWeek,-1),
            }
    }
}