import mongoose from 'mongoose';
import jobObj from "./jobObj.js";
import {invoiceSchema} from "./invoice.js";

const opts = { toJSON: { virtuals: true } };
export const jobSchema = new mongoose.Schema(jobObj,opts);

jobSchema.virtual('invoices',{
  ref: 'Invoice',
  localField: '_id',
  foreignField: 'job'
})

jobSchema.virtual('readyForInvoice').get(function(){
  const docValues = JSON.parse(JSON.stringify(this._doc))
  const invoiceDoc = new mongoose.Document(docValues,invoiceSchema)
  const validationResult = invoiceDoc.validateSync()
  console.log(9, validationResult)
  if(typeof validationResult==='undefined'){
    return (true)
  }
  else {
    return false
  }
})

let Job = mongoose.model("Job", jobSchema, "jobs");

function getPagination(skip,limit,count){
  return{
    from: skip +1,
    to: Math.min(skip + limit,count),
    of: count
  }
}

async function list({ from, to, skip, limit, sub }) {
  const filter = {}
  if(from) filter.start = { $gte: from }
  if(to) filter.end = { $lte: to }
  filter.sub = sub
  const query  = Job
      .find(filter)

  const count = await Job.countDocuments(filter)
  console.log(count)
  if((typeof skip!=='undefined') && (typeof limit!=='undefined')){
    query.limit(Number(limit))
        .skip(Number(skip))
  }
  let items = await query.populate('invoices');
  return {items,
    pagination: getPagination(skip,limit,count),
    count: items.length
  };
}

async function create(data, sub) {
  let job = new Job({ ...data, sub });
  await job.save(); //TODO add some validation start must be before end
  return job;
}

async function get(id) {
  const job = await Job.findById(id).populate('invoices');
  return job;
}

async function remove(id) {
  let data = await Job.deleteOne({ _id: id });
  return data;
}

async function edit(_id, change) {
  // let job = await Job.findByIdAndUpdate(_id, change, {
  //   new: true,
  //   runValidators: true,
  // });
  // return job;
  const job = await get(_id);
  Object.keys(change).forEach(function (key) {
    job[key] = change[key];
  });
  await job.save();
  return job;
}

async function deleteFake(id){
  await Job.deleteMany({
    id,
    fake: true
  })
}

async function updateFake(id,data){
  await deleteFake(id)
  const result = await Job.insertMany(data)
  return result
}

async function resetData(data) {
  await Job.deleteMany();
  console.log(data);
  await Job.insertMany(data);
}

export default {
  list,
  create,
  get,
  remove,
  resetData,
  edit,
  updateFake,
  jobSchema,
};

