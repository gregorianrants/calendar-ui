const dotenv = require("dotenv");

dotenv.config();
const express = require("express");
const router = express.Router();
const jobsController = require("./../controllers/jobsController");
const checkJwt = require('./../authMiddleware/checkJwt')



router
  .get("/", checkJwt, jobsController.getJobs)
  .get("/:id", jobsController.getJob)
  .post("/", checkJwt, jobsController.createJob)
  .delete("/:id", jobsController.deleteJob)
  .put("/:id", jobsController.editJob);

module.exports = router;
