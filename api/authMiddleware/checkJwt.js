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
    req.user = {sub: 'google-oauth2|100318194916310076674'}
    next()
}

console.log('node_env', process.env.NODE_ENV)
console.log('authed', process.env.AUTHED)
if (process.env.NODE_ENV==='development'){
    console.log('running in dev mode')
    module.exports = mockAuth
}
else if (process.env.NODE_ENV==='production' && process.env.AUTHED==='true'){
    console.log('running in production mode with mocked authentication')
    module.exports = mockAuth
}
else{
    console.log('running in production mode')
    module.exports = checkJwt
}



