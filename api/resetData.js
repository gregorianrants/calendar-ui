require("dotenv").config();

console.log(process.env.DB_PASSWORD);
import './model/db.js';
import Job from './model/job.js';
import fs from 'fs/promises';
import cuid from 'cuid';
import { addDays } from 'date-fns';
require("dotenv").config();

const SUB = process.env.SUB

import getData from './generateData.js';

function wrapInObject(el) {
  return {
    value: el,
    id: cuid(),
  };
}

/*const jobs = [
  {
    sub: "google-oauth2|105644745115950757439",//uses jsonargonaught2001@gmail.com
    start: addDays(new Date().setHours(14), 1),
    end: addDays(new Date().setHours(16), 1),
    customer: {
      name: "json argonot 2001",
      mobile: "07930103787",
      email: "alan@btinternet.co.uk",
    },
    charges: {
      hourlyRate: 55,
      fuelCharge: 20,
      travelTime: 30,
    },
    operatives: [{ value: "fenwick" }, { value: "dave" }],
    addresses: [{ value: "19 coral glen" }, { value: "4 craigie avenue" }],
    items: `fridge is 5ft
            sent list as photo so can paste in
            lawnmower
            fridge 5ft
            strimmer
            2 rugs
            black bag
            2 vacuam bags
            excercise mat
            xmas tree
            4 suits in bags
            coff table
            8 boxes
            prety chunky weights bench
            bike
            rucksackf
            bag
            shopping
            marsbar`,
  },
  {
    sub: "google-oauth2|100318194916310076674",//uses gregorianrants4@gmail.com
    start: addDays(new Date().setHours(10), 7),
    end: addDays(new Date().setHours(13), 7),
    customer: {
      name: "Alan Murray",
      mobile: "07930103787",
      email: "alan@btinternet.co.uk",
    },
    charges: {
      hourlyRate: 55,
      fuelCharge: 20,
      travelTime: 30,
    },
    operatives: [{ value: "fenwick" }, { value: "dave" }],
    addresses: [{ value: "19 coral glen" }, { value: "4 craigie avenue" }],
    items: `fridge is 5ft
sent list as photo so can paste in
lawnmower
fridge 5ft
strimmer
2 rugs
black bag
2 vacuam bags
excercise mat
xmas tree
4 suits in bags
coff table
8 boxes
prety chunky weights bench
bike
rucksackf
bag
shopping
marsbar`,
  },
  {
    sub: "google-oauth2|100318194916310076674",
    start: addDays(new Date().setHours(10), -7),
    end: addDays(new Date().setHours(13), -7),
    customer: {
      name: "Alan Murray",
      mobile: "07930103787",
      email: "alan@btinternet.co.uk",
    },
    charges: {
      hourlyRate: 55,
      fuelCharge: 20,
      travelTime: 30,
    },
    operatives: [{ value: "fenwick" }, { value: "dave" }],
    addresses: [{ value: "19 coral glen" }, { value: "4 craigie avenue" }],
    items: `fridge is 5ft
sent list as photo so can paste in
lawnmower
fridge 5ft
strimmer
2 rugs
black bag
2 vacuam bags
excercise mat
xmas tree
4 suits in bags
coff table
8 boxes
prety chunky weights bench
bike
rucksackf
bag
shopping
marsbar`,
  },
  {
    sub: "google-oauth2|100318194916310076674",
    start: new Date().setHours(10),
    end: new Date().setHours(13),
    customer: {
      name: "Alan Murray",
      mobile: "07930103787",
      email: "alan@btinternet.co.uk",
    },
    charges: {
      hourlyRate: 55,
      fuelCharge: 20,
      travelTime: 30,
    },
    operatives: [{ value: "fenwick" }, { value: "dave" }],
    addresses: [{ value: "19 coral glen" }, { value: "4 craigie avenue" }],
    items: `fridge is 5ft
sent list as photo so can paste in
lawnmower
fridge 5ft
strimmer
2 rugs
black bag
2 vacuam bags
excercise mat
xmas tree
4 suits in bags
coff table
8 boxes
prety chunky weights bench
bike
rucksackf
bag
shopping
marsbar`,
  },
  {
    sub: "google-oauth2|100318194916310076674",
    start: new Date().setHours(12),
    end: new Date().setHours(14),
    customer: {
      name: "Alan Murray",
      mobile: "07930103787",
      email: "alan@btinternet.co.uk",
    },
    charges: {
      hourlyRate: 55,
      fuelCharge: 20,
      travelTime: 30,
    },
    operatives: [{ value: "fenwick" }, { value: "dave" }],
    addresses: [{ value: "19 coral glen" }, { value: "4 craigie avenue" }],
    items: `fridge is 5ft
sent list as photo so can paste in
lawnmower
fridge 5ft
strimmer
2 rugs
black bag
2 vacuam bags
excercise mat
xmas tree
4 suits in bags
coff table
8 boxes
prety chunky weights bench
bike
rucksackf
bag
shopping
marsbar`,
  },
  {
    sub: "google-oauth2|100318194916310076674",
    start: new Date().setHours(14),
    end: new Date().setHours(16),
    customer: {
      name: "Alan Murray",
      mobile: "07930103787",
      email: "alan@btinternet.co.uk",
    },
    charges: {
      hourlyRate: 55,
      fuelCharge: 20,
      travelTime: 30,
    },
    operatives: [{ value: "fenwick" }, { value: "dave" }],
    addresses: [{ value: "19 coral glen" }, { value: "4 craigie avenue" }],
    items: `fridge is 5ft
sent list as photo so can paste in
lawnmower
fridge 5ft
strimmer
2 rugs
black bag
2 vacuam bags
excercise mat
xmas tree
4 suits in bags
coff table
8 boxes
prety chunky weights bench
bike
rucksackf
bag
shopping
marsbar`,
  },
  {
    sub: "google-oauth2|100318194916310076674",
    start: addDays(new Date().setHours(14), 1),
    end: addDays(new Date().setHours(16), 1),
    customer: {
      name: "Alan Murray",
      mobile: "07930103787",
      email: "alan@btinternet.co.uk",
    },
    charges: {
      hourlyRate: 55,
      fuelCharge: 20,
      travelTime: 30,
    },
    operatives: [{ value: "fenwick" }, { value: "dave" }],
    addresses: [{ value: "19 coral glen" }, { value: "4 craigie avenue" }],
    items: `fridge is 5ft
            sent list as photo so can paste in
            lawnmower
            fridge 5ft
            strimmer
            2 rugs
            black bag
            2 vacuam bags
            excercise mat
            xmas tree
            4 suits in bags
            coff table
            8 boxes
            prety chunky weights bench
            bike
            rucksackf
            bag
            shopping
            marsbar`,
  },
];*/



/*
fs.readFile('./api/jobs.json')
    .then(data=>JSON.parse(data))
    .then(data=>{
        Job.resetData(data)
            .catch(err=>{console.log(err)})
    })
*/

async function reset(jobs){
  await Job.resetData(jobs).catch((err) => {
    console.log(err);
  });

  return jobs
}

getData(SUB).then(reset).then(console.log).catch(console.error)

