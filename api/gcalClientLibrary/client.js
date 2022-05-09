import {google} from "googleapis";
import GcalApiError from '../errorUtilities/GcalApiError.js'

function getClients({access_token, refresh_token}){
    const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
    const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
    const GOOGLE_REDIRECT_URL = process.env.GOOGLE_REDIRECT_URL

    const oauth2Client = new google.auth.OAuth2(
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
        GOOGLE_REDIRECT_URL,
    );

    const calendar = google.calendar({version: "v3", auth: oauth2Client});

    oauth2Client.setCredentials({access_token,refresh_token});

    const scopes = ["openid", 'https://www.googleapis.com/auth/calendar'];

    return {
        oauth2Client,
        calendar
    }
}

const tryCatchWrapper = (executable) => async (...args) => {
    try {
        const result = await executable(...args);
        return result;
    } catch (err) {
        // use any custom handler here
        const newError =  new GcalApiError(err)
        console.log(newError)
        throw  newError
    }
}

const wrapFactory = (factory) => (...args) =>{
    return tryCatchWrapper(factory(...args))
}

export function listEventsFactory({access_token, refresh_token}){
    const {calendar} = getClients({access_token,refresh_token})
    return tryCatchWrapper(
        async function({from,to}){
            return await calendar.events.list({
                calendarId: "primary",
                timeMin: from,
                timeMax: to,
                maxResults: 200,
                singleEvents: true,
                orderBy: "startTime",
            })
        }
    )
}

