import {google} from "googleapis";
import GcalApiError from '../errorUtilities/GcalApiError.js'

function getOauth2Client(){
    const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
    const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
    const GOOGLE_REDIRECT_URL = process.env.GOOGLE_REDIRECT_URL

    console.log(GOOGLE_REDIRECT_URL)

    const oauth2Client = new google.auth.OAuth2(
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
        GOOGLE_REDIRECT_URL,
    );
    return oauth2Client
}

async function getTokens(code){
    const oauth2Client = getOauth2Client()
    const {tokens} = await oauth2Client.getToken(code);
    const {access_token,refresh_token} = tokens
    return {
        access_token,
        refresh_token
    }
}

function getCalendarClient({access_token, refresh_token}){
    const oauth2Client = getOauth2Client()
    const calendar = google.calendar({version: "v3", auth: oauth2Client});
    oauth2Client.setCredentials({access_token,refresh_token});
    return calendar
}

export function getAuthUrl(){
    const scopes = ["openid", 'https://www.googleapis.com/auth/calendar.events.readonly'];
    const oauth2Client = getOauth2Client()
    const url = oauth2Client.generateAuthUrl({
        // 'online' (default) or 'offline' (gets refresh_token)
        access_type: "offline",
        // If you only need one scope you can pass it as a string
        scope: scopes,
    })
    return url
}
//TODO sometimes i get invalid_grant and others invalid_token needs investigation is one from revoking outside of van cal and the other from within
function isRevokedTokenError(err){
    if (err?.response?.data?.error === 'invalid_grant' || err?.response?.data?.error === "invalid_token"){
        return true
    }
}
// function isRevokedTokenError(err){
//     if (err?.response?.data?.error === 'invalid_grant' && err?.response?.data?.error_description === "Token has been expired or revoked."){
//         return true
//     }
// }

export async function revokeAuth(accessToken){
    const oauth2Client = getOauth2Client()
    try {
        await oauth2Client.revokeToken(accessToken)
    }
    catch(err){
        if(isRevokedTokenError(err)){console.log('token already revoked')}
        else{
            throw(err)
        }
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
    const calendar = getCalendarClient({access_token,refresh_token})
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

async function checkAuth({access_token='',refresh_token=''}){
    const calendarClient = getCalendarClient({access_token, refresh_token})

    try{
        const result = await calendarClient.calendarList.list();
        return true
    }catch (err){
        console.error(JSON.stringify(err,null,2))
        if(err.response.data.error==='invalid_grant'){
            return false
        }
        else{
            throw(err)
        }
    }
}

export default{
    getAuthUrl,
    revokeAuth,
    listEventsFactory,
    getCalendarClient,
    checkAuth,
    getTokens
}