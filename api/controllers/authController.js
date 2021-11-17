const User = require("./../model/user");
const autoCatch = require("../lib/autoCatch");

async function signIn(req, res) {
  console.log('fuck off');
  res.status(200).json({
    hello: "world",
  });
}

module.exports = autoCatch({
  signIn,
});


