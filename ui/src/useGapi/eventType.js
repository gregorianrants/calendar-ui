//import {isSameDay} from "date-fns";

const {isSameDay} = require('date-fns')

/*an all day event has start and end time described as such:
 "start": {
        "date": "2021-08-30"
    },
where as an non all day event has start and end time described by a string as such
    "start": {
        "dateTime": "2021-08-30T10:00:00+01:00"//look here
    },
-
all day events can span one day or multiple days
events with start and finish times can be within a day or over multiple days
we want to filter out:

 any 'all day events' wether just spanning one day or many
 any events that have start and finish time that span myultiple days

 TODO: write a test for fitlering out these events that uses a week on google
 calendar and makes sure we get the right number of each type of event.
 */

/*const dateSpecified = {
    "kind": "calendar#event",
    "etag": "\"3261020895504000\"",
    "id": "039cad35lth063o6uivusnvccu",
    "status": "confirmed",
    "htmlLink": "https://www.google.com/calendar/event?eid=MDM5Y2FkMzVsdGgwNjNvNnVpdnVzbnZjY3UgZ3JlZ29yaWFucmFudHM0QG0",
    "created": "2021-09-01T15:34:07.000Z",
    "updated": "2021-09-01T15:34:07.752Z",
    "summary": "all day",
    "creator": {
        "email": "gregorianrants4@gmail.com",
        "self": true
    },
    "organizer": {
        "email": "gregorianrants4@gmail.com",
        "self": true
    },
    "start": {
        "date": "2021-08-30"
    },
    "end": {
        "date": "2021-08-31"
    },
    "transparency": "transparent",
    "iCalUID": "039cad35lth063o6uivusnvccu@google.com",
    "sequence": 0,
    "reminders": {
        "useDefault": false
    },
    "eventType": "default"
}*/

/*const multiDayDateSpecified = {
    "kind": "calendar#event",
    "etag": "\"3261021023538000\"",
    "id": "3lrk65s4vd3k7cjo9vj4n5egqm",
    "status": "confirmed",
    "htmlLink": "https://www.google.com/calendar/event?eid=M2xyazY1czR2ZDNrN2Nqbzl2ajRuNWVncW0gZ3JlZ29yaWFucmFudHM0QG0",
    "created": "2021-09-01T15:34:57.000Z",
    "updated": "2021-09-01T15:35:11.769Z",
    "summary": "spans days all day event",
    "creator": {
        "email": "gregorianrants4@gmail.com",
        "self": true
    },
    "organizer": {
        "email": "gregorianrants4@gmail.com",
        "self": true
    },
    "start": {
        "date": "2021-08-30" //look here
    },
    "end": {
        "date": "2021-09-02" //look here
    },
    "transparency": "transparent",
    "iCalUID": "3lrk65s4vd3k7cjo9vj4n5egqm@google.com",
    "sequence": 1,
    "reminders": {
        "useDefault": false
    },
    "eventType": "default"
}*/

/*
const multiDayEventWithStartAndEndTime = {
    "kind": "calendar#event",
    "etag": "\"3261018162850000\"",
    "id": "7hs516af80h2jpcfbdvjmrlur7",
    "status": "confirmed",
    "htmlLink": "https://www.google.com/calendar/event?eid=N2hzNTE2YWY4MGgyanBjZmJkdmptcmx1cjcgZ3JlZ29yaWFucmFudHM0QG0",
    "created": "2021-09-01T15:07:53.000Z",
    "updated": "2021-09-01T15:11:21.425Z",
    "summary": "test all day",
    "creator": {
        "email": "gregorianrants4@gmail.com",
        "self": true
    },
    "organizer": {
        "email": "gregorianrants4@gmail.com",
        "self": true
    },
    "start": {
        "dateTime": "2021-08-30T10:00:00+01:00"//look here
    },
    "end": {
        "dateTime": "2021-09-02T10:30:00+01:00"//look here
    },
    "iCalUID": "7hs516af80h2jpcfbdvjmrlur7@google.com",
    "sequence": 2,
    "reminders": {
        "useDefault": true
    },
    "eventType": "default"
}
*/

/*const multiDayTimeSpecified = {
    "kind": "calendar#event",
    "etag": "\"3260332067908000\"",
    "id": "325o0j6skfd21p3i6sodahferh",
    "status": "confirmed",
    "htmlLink": "https://www.google.com/calendar/event?eid=MzI1bzBqNnNrZmQyMXAzaTZzb2RhaGZlcmggZ3JlZ29yaWFucmFudHM0QG0",
    "created": "2021-08-28T15:31:39.000Z",
    "updated": "2021-08-28T15:53:53.954Z",
    "summary": "matt paton 1 to 2 hours",
    "creator": {
        "email": "gregorianrants4@gmail.com",
        "self": true
    },
    "organizer": {
        "email": "gregorianrants4@gmail.com",
        "self": true
    },
    "start": {
        "dateTime": "2021-08-31T13:15:00+01:00"//look here
    },
    "end": {
        "dateTime": "2021-08-31T15:00:00+01:00"
    },
    "iCalUID": "325o0j6skfd21p3i6sodahferh@google.com",
    "sequence": 0,
    "attendees": [
        {
            "email": "brianwilkes78@gmail.com",
            "responseStatus": "accepted"
        },
        {
            "email": "gregorianrants4@gmail.com",
            "organizer": true,
            "self": true,
            "responseStatus": "accepted"
        }
    ],
    "hangoutLink": "https://meet.google.com/fam-byni-vfs",
    "conferenceData": {
        "entryPoints": [
            {
                "entryPointType": "video",
                "uri": "https://meet.google.com/fam-byni-vfs",
                "label": "meet.google.com/fam-byni-vfs"
            }
        ],
        "conferenceSolution": {
            "key": {
                "type": "hangoutsMeet"
            },
            "name": "Google Meet",
            "iconUri": "https://fonts.gstatic.com/s/i/productlogos/meet_2020q4/v6/web-512dp/logo_meet_2020q4_color_2x_web_512dp.png"
        },
        "conferenceId": "fam-byni-vfs",
        "signature": "ADXwMqP1aYxChM5l0MUGlky9AYGZ"
    },
    "reminders": {
        "useDefault": true
    },
    "eventType": "default"
}*/


function isDateSpecified(event){
    if (event.start.hasOwnProperty('date')){
        if(!event.end.hasOwnProperty('date')){
            throw new Error('there was a case not accounted for when writing this function')
        }
    }
    return event.start.hasOwnProperty('date')
}


function isTimeSpecified(event){
    return !isDateSpecified(event)

}

function isMultiDayTimeSpecified(event){
    if(isDateSpecified(event)){
        throw new Error('this function only works with non-all day event  - events')
    }
    const start = new Date(event.start.dateTime)
    const end = new Date(event.start.dateTime)
    return !isSameDay(start,end)
}


/*console.log(isMultiDayTimeSpecified(multiDayTimeSpecified))*/

module.exports =  {isTimeSpecified,isMultiDayTimeSpecified}


