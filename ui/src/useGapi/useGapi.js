import React from 'react'
import {add} from "date-fns";
import {CLIENT_ID,API_KEY} from "./constants";

import gapiEventType from './eventType'

import {reshape} from './reshape'

async function initClient(updateSigninStatus) {
    /*var CLIENT_ID = '960665164291-hsqm8gr0imejuo32saj23bh50gr2i2u1.apps.googleusercontent.com';
    var API_KEY = process.env.API_KEY*/
    // Array of API discovery doc URLs for APIs used by the quickstart
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    // Authorization scopes required by the API; multiple scopes can be
    // included, separated by spaces.
    var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
    await window.gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    })


    let listner = window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());

    const cleanUpListner = () => {
        listner.remove()
    }

    return cleanUpListner


}

function load() {
    return new Promise(((resolve, reject) => {
        window.gapi.load('client:auth2',
            {
                callback: function () {
                    resolve()
                },
                onerror: function () {
                    reject()
                }
            },
        )
    }))
}

export async function setUpGapi(updateSigninStatus) {
    /*if (!window.gapi) {
        throw new Error('gapi needs to be loaded on script tag from: https://apis.google.com/js/api.js')
    }*/
    await load()
    await initClient(updateSigninStatus)
    if (!window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
        window.gapi.auth2.getAuthInstance().signIn();
    }
}

export function useGapi() {
    const [authed, setAuthed] = React.useState(false)

    function updateSigninStatus(isSignedIn) {
        setAuthed(isSignedIn)
    }

    const signOut = React.useCallback(() => {
        window.gapi.auth2.getAuthInstance().signOut()
    }, [])

    const listEvents = (from, to) => {
        return window.gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': from.toISOString(),
            'timeMax': to.toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'orderBy': 'startTime'
        }).then(function (response) {
            const events = response.result.items;
            return events.filter(
                event=>gapiEventType.isTimeSpecified(event) && !gapiEventType.isMultiDayTimeSpecified(event)
                )
                .map(event=>reshape(event))
        })
    }

    React.useEffect(() => {

        let cleanUpFunction


        (async ()=> {
            cleanUpFunction = await setUpGapi(updateSigninStatus)
        })()

        return cleanUpFunction
    }, [])
    return {authed, listEvents, signOut}
}

//a component to test gapi
export function EventsList() {
    const {authed, listEvents, signOut} = useGapi()

    const [events, setEvents] = React.useState([])

    React.useEffect(() => {
        const dateFrom = add(new Date(), {months: -2})
        const dateTo = add(dateFrom, {days: 7})

        if (authed) {
            listEvents(dateFrom, dateTo)
                .then(setEvents)
        }

    }, [authed,listEvents])

    return (
        <div className="App">
            <p>
                hello {String(authed)}
            </p>
            <button onClick={signOut}>
                sign me out
            </button>
            <div>
                {events.map(event => (
                    <p>{event.summary}</p>
                ))}
            </div>
        </div>
    );
}
