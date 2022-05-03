const domain = process.env.AUTH0_DOMAIN;
const audience = process.env.AUTH0_AUDIENCE;

const SUB = process.env.SUB


import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';


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
    req.user = {sub: SUB}
    next()
}

console.log('node_env', 'start'+process.env.NODE_ENV+'end')
console.log('authed', process.env.AUTHED=='true')
console.log('authed', typeof process.env.AUTHED)

let exportedMiddleware

if (process.env.NODE_ENV==='development'){
    console.log('running in dev mode')
    exportedMiddleware =  mockAuth;
}

else if (process.env.NODE_ENV==='production' && process.env.AUTHED==='true'){
    console.log('running in production mode with mocked authentication')
    exportedMiddleware = mockAuth;
}

else{
    console.log('running in production mode')
    exportedMiddleware = checkJwt;
}

export default exportedMiddleware



