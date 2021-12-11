const domain = process.env.AUTH0_DOMAIN;
const audience = process.env.AUTH0_AUDIENCE;


const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");


const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${domain}/.well-known/jwks.json`,
    }),

    audience: audience,
    issuer: `https://${domain}/`,
    algorithms: ["RS256"],
});

const mockAuth = (req,res,next)=>{
    req.user = //need to put sub here
    next()
}

module.exports = checkJwt
//module.exports = mockAuth
