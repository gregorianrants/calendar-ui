import Event from './Event'
import GcalEvent from "./gcalEvent";



import {configure} from "../eventGeometry/eventGeometry";
import React from "react";
import settingsContext from "./Contexts";
import {batchProcess} from "../utilities/batchProcess";

export default function Events({gcalEvents,events,updateEvent,updateDisplayEvent}) {
    const {hourHeight}=React.useContext(settingsContext)
    const eventsGeometry = configure(hourHeight, 0)
        //TODO was initially counting border width into calculation but using
    //border box it doesnt mater consider refactor

    //TODO super confusing changing this function up chain consider refactor
   /* const updateEventWithIdF = (id) => (
        (top, bottom) => {
            let start = getTime(getNumPixels(top), hourHeight * 24)
            let end = getTime(hourHeight * 24 - getNumPixels(bottom), hourHeight * 24)
            updateEvent(id, {start, end})
        }
    )*/

    const [eventsProcessed,gcalProcessed] = batchProcess(events,gcalEvents,eventsGeometry)

    return (
       /* eventsGeometry(events)*/
            [...eventsProcessed
            .map(
                (evnt, i) => {
                    return <Event
                        {...evnt}
                        key={evnt._id}
                        updateEvent={updateEvent}
                        updateDisplayEvent={updateDisplayEvent}
                    />
                }
            ),
                ...gcalProcessed.map(
                (evnt, i) => {
                    return <GcalEvent
                        {...evnt}
                        key={evnt.id}
                        updateEvent={updateEvent}
                        updateDisplayEvent={updateDisplayEvent}
                    />
                }
            )
            ]
    )
}
