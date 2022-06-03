import {User} from '../model/User.js'
import autoCatch from '../lib/autoCatch.js';
import AppError from './../errorUtilities/AppError.js';
import gcalService from "../gcalClientLibrary/client.js";

async function getUrl(req, res) {
    const url = gcalService.getAuthUrl()
    res.status(200).json({
        url,
    });
}

async function revokeAuth(req, res, next) {
    const {sub} = req.user
    const user = await User.findById(sub)
    const {accessToken} = user
    //TODO should i mark a pending state in the db before starting this what if the db update fails after the revokation
    await gcalService.revokeAuth(accessToken)
    user.authorizedToGcal = false
    user.accessToken = null
    user.refreshToken = null
    user.save()
    res.status(200).json({
        status: 'success',
    })
}

async function checkAuth(req, res, next) {
    const {sub} = req.user
    const user = await User.findById(sub)
    if(!user.authorizedToGcal){
        return next(new AppError(`this endpoint is for checking if the authrozation to google calendar has been invalidated outside of the app,
        however there is currently no authorization to google calendar to test.
        `))
    }
    const tokens = {
        access_token: user.accessToken,
        refresh_token: user.refreshToken
    }
    const result = await gcalService.checkAuth(tokens)
    res.send({data: {
        authed: result
        }});
}

async function authorizeUser(req, res) {
    //TODO: look at errors that can be thrown by oauth2client and handle them
    const {sub} = req.user
    const {code} = req.query;

    const {access_token,refresh_token} = await gcalService.getTokens(code)

    const user = await User.findById(sub)
    user.accessToken = access_token
    user.refreshToken = refresh_token
    user.authorizedToGcal = true
    await user.save()


    res.status(200).json({
        status: 'success',
        data: {authorizedToGcal: user.authorizedToGcal}
    })
}

async function getJobs(req, res, next) {
    const {sub} = req.user
    const user = await User.findById(sub)
    const tokens = {
        access_token: user.accessToken,
        refresh_token: user.refreshToken
    }
    const {from, to} = req.query
    const listEvents = gcalService.listEventsFactory(tokens)
    var events = await listEvents({from,to})

    res.status(200).json({
        status: 'success',
        data: events.data.items
    })
}

export default autoCatch({
    getUrl,
    authorizeUser,
    getJobs,
    checkAuth,
    revokeAuth
});


