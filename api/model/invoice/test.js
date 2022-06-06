import '../testDb.js'
import mongoose from "mongoose";
import invoice from './invoice.js'



mongoose.connection.on('connected', async function () {

    await invoice.edit('629d027c35cb3e8cf1ee3780', {bill: 60})

});