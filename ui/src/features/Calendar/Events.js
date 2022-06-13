import JobTile from '../eventTiles/jobTile'
import GcalTile from "../eventTiles/gcalTile";
import {configure} from "../../eventGeometry/eventGeometry";
import React, {useMemo} from "react";
import settingsContext from "./Contexts";
import {batchProcess} from "../../utilities/batchProcess";
import {useSelector} from "react-redux";
import {useGetJobsQuery,useGetGcalQuery,usePrefetch} from "../api/apiSlice";
import { createSelector } from '@reduxjs/toolkit'
import compose from "compose-function";
import {parseISO,addDays} from "date-fns";


const filterByStartDate=(date)=>
    events=> events.filter(event => new Date(event.start).getDay() === date.getDay())

function unSerialiseEvent(event){
    return {...event,
        start: parseISO(event.start),
        end: parseISO(event.end)
    }
}

const unSerialiseEvents = (events)=> events.map(event=>unSerialiseEvent(event))

export default function Events({date}) {
    const {hourHeight}=React.useContext(settingsContext)
    const eventsGeometry = configure(hourHeight, 0)
    const prefetchGcal = usePrefetch('getGcal')

    const firstDay = useSelector(state=>state.calendar.firstDay)
    const lastDay = useSelector(state=>state.calendar.lastDay)

    const isAuthorizedToGcal = useSelector(state=>state.auth.isAuthorizedToGcal)

    React.useEffect(()=>{
        if(isAuthorizedToGcal){
            prefetchGcal({from: lastDay, to: addDays(new Date(lastDay),7).toISOString()})
            prefetchGcal({from: addDays(new Date(firstDay),-7).toISOString(), to: firstDay})
        }
     },[firstDay,lastDay,isAuthorizedToGcal,prefetchGcal])//added prefetchgcal as per error warnings

    const selectJobsForDate = useMemo(
        ()=>{
            return createSelector(
                res=>res.data || [], //adding this ' || []' solved a bug
                (res,date)=>date,
                (data,date)=>compose(unSerialiseEvents,filterByStartDate(date))(data)
            )
        },[])

    const {jobsForDate} = useGetJobsQuery({from: firstDay, to: lastDay},{
        selectFromResult: result=>({
            jobsForDate: selectJobsForDate(result,date)
        })
    })

    const selectGcalForDate = useMemo(
        ()=>{
            return createSelector(
                res=>res.data || [], //adding this ' || []' solved a bug
                (res,date)=>date,
                (data,date)=>compose(unSerialiseEvents,filterByStartDate(date))(data)
            )
        },[])

    const {gcalForDate} = useGetGcalQuery({from: firstDay, to: lastDay},{
        skip: !isAuthorizedToGcal,
        selectFromResult: result=>({
            gcalForDate: selectGcalForDate(result,date)
        })
    })

    // const {data: jobs = []} = useGetJobsQuery({from: firstDay, to: lastDay})
    //
    // console.log(jobs)
    //
    // const jobsForDate= compose(unSerialiseEvents,filterByStartDate(date))(jobs)
    //
    // console.log(jobsForDate)


    // const events = useSelector(calendarSelectors.eventsForDate(date))
    // const gcalEvents = useSelector(calendarSelectors.gcalEventsForDate(date))

    const [eventsProcessed,gcalProcessed] = batchProcess(jobsForDate,gcalForDate || [],eventsGeometry)

    return (
       /* eventsGeometry(events)*/
            [...eventsProcessed
            .map(
                (evnt, i) => {
                    return <JobTile
                        {...evnt}
                        key={evnt._id}
                    />
                }
                ),
                ...gcalProcessed.map(
                (evnt, i) => {
                    return <GcalTile
                        {...evnt}
                        key={evnt.id}
                    />
                }
            )
            ]
    )
}
