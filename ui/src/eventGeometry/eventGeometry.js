import groupEvents from './groupEvents'
import {asDecimal} from '../utilities/timeConversions.js'

export function configure(height,border){
    const position = (
        (height, border) => {
        const hours = (time) => Math.floor(time)
        const minutes = (time) => time - hours(time)

        return (time) => {
            time = asDecimal(time)  //TODO modifying state here, please refactor.

            return hours(time) * height + (hours(time) + 1) * border + height * minutes(time)//TODO need to make this more declaritive
        }
    })(height,border)

    const widthOfCol = (cols) => 100 / cols.length

    const left = (colIndex, cols) => colIndex * widthOfCol(cols)




    function eventGeometry(event,colIndex,cols) {
        const {start, end} = event
        return {
            ...event,
            top: position(start),
            bottom: (height*24) - position(end),
            left: String(left(colIndex,cols)) + '%',
            right: String(100 - (left(colIndex,cols) + widthOfCol(cols))) + '%'
        }
    }

    function flatDeep(arr, d = 1) {
        return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])
            : arr.slice();
    };



    return function eventsGeometry(events) {




        let result =  groupEvents(events).map(
            overlappingGroup => overlappingGroup
                .map((col, colIndex) => {
                    return col.map((event, eventIndex) => (
                        eventGeometry(event,colIndex,overlappingGroup,height,border)
                    ))
                })
        )
        return flatDeep(result,Infinity)
    }
}

