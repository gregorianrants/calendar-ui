import dotenv from 'dotenv';

dotenv.config();
import express from 'express';

const router = express.Router();
import jobsController from './../controllers/jobsController.js';
import checkJwt from './../authMiddleware/checkJwt.js';


router
    .get("/", checkJwt, jobsController.getJobs)
    .get("/:id", jobsController.getJob)
    .post("/", checkJwt, jobsController.createJob)
    .post("/fake-data", checkJwt, jobsController.updateFakeData)
    .delete("/:id", jobsController.deleteJob)
    .put("/:id", jobsController.editJob);

export default router;
