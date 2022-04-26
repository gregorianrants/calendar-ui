const {User} = require("./../model/user");
const autoCatch = require("../lib/autoCatch");
const { google } = require("googleapis");
const {findBySubOrCreate} = require('./../model/user')

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const GOOGLE_REDIRECT_URL = process.env.GOOGLE_REDIRECT_URL

console.log(GOOGLE_CLIENT_ID)
console.log(GOOGLE_CLIENT_SECRET)
console.log(GOOGLE_REDIRECT_URL)

const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URL,
);

const calendar = google.calendar({ version: "v3", auth: oauth2Client });

// generate a url that asks permissions for Blogger and Google Calendar scopes
const scopes = ["openid",'https://www.googleapis.com/auth/calendar'];

const url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: "offline",
  // If you only need one scope you can pass it as a string
  scope: scopes,
});

async function getUrl(req, res) {
  console.log(url)
  res.status(200).json({
    url,
  });
}

async function authorizeUser(req,res){
  //TODO: look at errors that can be thrown by oauth2client and handle them
  const {sub} = req.user
  const { code } = req.query;
  const result = await oauth2Client.getToken(code);
  const { tokens } = result;

  const user = await User.findById(sub)

  user.accessToken = tokens.access_token
  user.refreshToken = tokens.refresh_token
  user.authorizedToGcal = true

  await user.save()

  res.status(200).json({
    status: 'success',
    data: {authorizedToGcal: user.authorizedToGcal}
  })
}

//havent actually made a route for this or tested it or anything yet.
async function getGcalEvents(req, res){
  const {sub} = req.user
  const user = await User.findById(sub)
  const tokens = {
    access_token: user.accessToken,
    refresh_token: user.refreshToken
  }
  oauth2Client.setCredentials(tokens);

  const {from,to}=req.query

    console.log('from',from)
    console.log('to',to)

  const result = await calendar.events
      .list({
        calendarId: "primary",
        timeMin: from,
          timeMax: to,
        maxResults: 200,
        singleEvents: true,
        orderBy: "startTime",
      })
       res.status(200).json({
           status: 'success',
           data: result.data.items
       })


}


module.exports = autoCatch({
  getUrl,
  authorizeUser,
  getJobs: getGcalEvents
})


