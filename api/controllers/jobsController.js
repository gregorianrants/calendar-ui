const Job = require('./../model/job')
const dateUtils = require('../dateUtilities/dateUtilities')//TODO share between api and react app
//const {notify} = require('../sockets')
const autoCatch = require('../lib/autoCatch')



async function getJobs(req, res){
    const {monday,sunday} = dateUtils.weekBoundaries(dateUtils.currentDateTime())
    //todo need to set monday to start of day and sunday to end of day
    const {from=monday, to=sunday}=req.query
        let data = await Job.list({from,to})
        res.status(200).json({status: 'success', data: data})
}

async function createJob(req,res){
        let job = await Job.create(req.body)
        //notify()
        res.status(200)
            .json({
                status:'success',
                data: job});
}

async function getJob(req,res){
        const job = await Job.get(req.params.id)
        res.status(200)
            .json({status: 'success',
                data: job})
}

async function deleteJob(req,res){
        const id = req.params.id;
        let data = await Job.remove(id)
        res.status(200).json({status: 'success',
        data: data})
}

async function editJob(req,res){
        const id = req.params.id;
        const data = await Job.edit(id,req.body)
        console.log(req.body)
        res.status(200).json({status: 'success',
            data: data})
}

module.exports = autoCatch({
  getJobs,createJob,getJob,deleteJob,editJob
})

