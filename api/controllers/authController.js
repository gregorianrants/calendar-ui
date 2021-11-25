const User = require("./../model/user");
const autoCatch = require("../lib/autoCatch");
const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
    "392789978801-vc3qkds18osc3ila8hlor0unc41hrlra.apps.googleusercontent.com",
    "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",
    "http://localhost:3000/oauthcallback"
);

const calendar = google.calendar({ version: "v3", auth: oauth2Client });

// generate a url that asks permissions for Blogger and Google Calendar scopes
const scopes = ["https://www.googleapis.com/auth/calendar", "openid"];

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

async function getAuthorization(req,res){
  const { code } = req.query;
  const result = await oauth2Client.getToken(code);
  console.log(result);
  const { tokens } = result;
  res.status(200).json({
    status: 'success'
  })
}

module.exports = autoCatch({
  getUrl,
  getAuthorization
});


