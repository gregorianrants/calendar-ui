const dotenv = require("dotenv");

dotenv.config();
const express = require("express");
const router = express.Router();
const jobsController = require("./../controllers/jobsController");
const { auth } = require("express-oauth2-jwt-bearer");
const jwksRsa = require("jwks-rsa");
const jwt = require("express-jwt");

const domain = process.env.AUTH0_DOMAIN;
const audience = process.env.AUTH0_AUDIENCE;

console.log("13", domain, audience);

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

router
  .get("/",checkJwt,jobsController.getJobs)
  .get("/:id", jobsController.getJob)
  .post("/", jobsController.createJob)
  .delete("/:id", jobsController.deleteJob)
  .put("/:id", jobsController.editJob);

module.exports = router;
