import Event from './Event'
import {getTime,getNumPixels} from "../utilities/utilities";


import {configure} from "../eventGeometry/eventGeometry";
import React from "react";
import settingsContext from "./Contexts";

export default function Events({events,updateEvent}) {
    const {borderWidth,hourHeight}=React.useContext(settingsContext)
    const eventsGeometry = configure(hourHeight, borderWidth)

    //TODO super confusing changing this function up chain consider refactor
    const updateEventWithIdF = (id) => (
        (top, bottom) => {
            let start = getTime(getNumPixels(top), hourHeight * 24)
            let end = getTime(hourHeight * 24 - getNumPixels(bottom), hourHeight * 24)
            updateEvent(id, {start, end})
        }
    )

    return (
        eventsGeometry(events)
            .map(
                (evnt, i) => <Event
                    {...evnt}
                    key={evnt.id}
                    updateEvent={updateEventWithIdF(evnt.id)}
                />
            )

    )
}
