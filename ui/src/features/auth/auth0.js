import createAuth0Client from "@auth0/auth0-spa-js";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const audience = process.env.REACT_APP_AUTH0_AUDIENCE;


// either with async/await
export default createAuth0Client({
  domain: domain,
  client_id: clientId,
  audience: audience,
});
