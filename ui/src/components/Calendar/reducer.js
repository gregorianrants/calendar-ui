import {weekContaining,setTimeDayStart,setTimeDayEnd} from "../../utilities/dateUtilities";
import {addDays} from "date-fns";
import React from "react";


export function getDay(date,increment=0){
    const currentDate = addDays(date,increment*1)
    const days = [new Date(currentDate)]
    const firstDay = setTimeDayStart(new Date(days[0]))
    const lastDay = setTimeDayEnd(new Date(days[days.length-1]))
    return {
        currentDate,days,firstDay,lastDay
    }
}
export function dayReducer(state,action){
    const {type} = action
    if(type==='INCREMENT'){
        console.log('type')
        return getDay(state.currentDate,1)
    }
    else if(type==='DECREMENT'){
        return getDay(state.currentDate,-1)
    }
}
export function useDay(){
    const [days,dispatch] = React.useReducer(dayReducer,
        new Date(),
        getDay)

    return [days,dispatch]
}

export function getWeek(date, increment=0){
    const currentDate = addDays(date,increment*7)
    const days = weekContaining(currentDate)
    const firstDay = setTimeDayStart(new Date(days[0]))//TODO
    const lastDay = setTimeDayEnd(new Date(days[days.length-1]))//TODO
    return {
        currentDate,days,firstDay,lastDay
    }
}

export function weekReducer(state,action){
    const {type} = action
    if(type==='INCREMENT'){
        console.log('type')
        return getWeek(state.currentDate,1)
    }
    else if(type==='DECREMENT'){
        return getWeek(state.currentDate,-1)
    }
}

export function useWeek(){
    const [days,dispatch] = React.useReducer(weekReducer,
        new Date(),
        getWeek)

    return [days,dispatch]
}



