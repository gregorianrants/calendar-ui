import '../testDb.js'
import mongoose from "mongoose";
import {getNextCount} from "./invoiceNumbers.js";


mongoose.connection.on('connected', async function () {
    console.log('Mongoose connected');
    const result = await getNextCount('1234456')
    console.log(result)
});

console.log(process.env.NODE_ENV)

