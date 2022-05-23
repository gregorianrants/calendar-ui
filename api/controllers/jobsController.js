import Job from './../model/job.js';
import dateUtils from '../dateUtilities/dateUtilities.js'; //TODO share between api and react app

//const {notify} = require('../sockets')
import autoCatch from '../lib/autoCatch.js';

import { nextDay } from 'date-fns';
import AppError from './../errorUtilities/AppError.js';

import generateData from '../generateData/index.js'

async function getJobs(req, res) {
  //res.status(500).json({status: "error", message: 'something went very wrong'});
  const { monday, sunday } = dateUtils.weekBoundaries(
    dateUtils.currentDateTime()
  );
  //todo need to set monday to start of day and sunday to end of day
  const { sub } = req.user;
  const { from = undefined, to = undefined, skip=0, limit=1000 } = req.query;
  let data = await Job.list({
    from,
    to,
    skip: Number(skip),
    limit: Number(limit),
    sub });

  // res.status(400)
  //     .json({
  //       status: 'error',
  //       message: 'crap'
  //     })

  res.status(200)
      .json({
        status: "success",
        data: data
      });
}

async function createJob(req, res) {
  const { sub } = req.user;
  console.log('22', sub)
  let job = await Job.create(req.body,sub);
  //notify()
  res.status(200).json({
    status: "success",
    data: job,
  });
}

async function getJob(req, res, next) {
  const job = await Job.get(req.params.id)
  if (!job) {
    const error = new AppError("No job found with that id", 404);
    return next(error);
  }
  res.status(200).json({ status: "success", data: job });
}

async function deleteJob(req, res) {
  const id = req.params.id;
  let data = await Job.remove(id);
  res.status(200).json({ status: "success", data: data });
}

async function editJob(req, res) {
  const id = req.params.id;
  const data = await Job.edit(id, req.body);
  res.status(200).json({ status: "success", data: data });
}

async function updateFakeData(req,res){
  const { sub } = req.user;
  const data = await generateData(sub)
  const result = await Job.updateFake(sub,data)
  res.status(200).json({ status: "success", data: result })
}



export default autoCatch({
  getJobs,
  createJob,
  getJob,
  deleteJob,
  editJob,
  updateFakeData
});
