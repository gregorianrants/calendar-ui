import Event from './Event'
import GcalEvent from "./gcalEvent";
import {configure} from "../../eventGeometry/eventGeometry";
import React from "react";
import settingsContext from "./Contexts";
import {batchProcess} from "../../utilities/batchProcess";
import {useSelector} from "react-redux";
import {calendarSelectors} from "./calendarSlice";

export default function Events({date}) {
    const {hourHeight}=React.useContext(settingsContext)
    const eventsGeometry = configure(hourHeight, 0)

    const events = useSelector(calendarSelectors.eventsForDate(date))
    const gcalEvents = useSelector(calendarSelectors.gcalEventsForDate(date))

    const [eventsProcessed,gcalProcessed] = batchProcess(events,gcalEvents,eventsGeometry)

    return (
       /* eventsGeometry(events)*/
            [...eventsProcessed
            .map(
                (evnt, i) => {
                    return <Event
                        {...evnt}
                        key={evnt._id}

                    />
                }
            ),
                ...gcalProcessed.map(
                (evnt, i) => {
                    return <GcalEvent
                        {...evnt}
                        key={evnt.id}
                    />
                }
            )
            ]
    )
}
