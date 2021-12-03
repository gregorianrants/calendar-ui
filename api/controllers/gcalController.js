const {User} = require("./../model/user");
const autoCatch = require("../lib/autoCatch");
const { google } = require("googleapis");
const {findBySubOrCreate} = require('./../model/user')

const oauth2Client = new google.auth.OAuth2(
    "392789978801-vc3qkds18osc3ila8hlor0unc41hrlra.apps.googleusercontent.com",
    "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",
    "http://localhost:3000/oauthcallback",
);

const calendar = google.calendar({ version: "v3", auth: oauth2Client });

// generate a url that asks permissions for Blogger and Google Calendar scopes
const scopes = ["openid"];

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

  calendar.events
      .list({
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: "startTime",
      })
      .then((response) => {
       res.status(200).json({
         status: 'success',
         data: response
       })
        //res.end();
      })
      .catch((err) => console.error);


}


module.exports = autoCatch({
  getUrl,
  authorizeUser,
  getJobs: getGcalEvents
})


