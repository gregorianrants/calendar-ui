import 'dotenv/config'
import './model/db.js';
import express from 'express';
import jobs from './routes/jobsRoute.js';
import auth from './routes/authRoute.js';
import users from './routes/usersRoute.js';
import invoice from "./routes/invoice.js";
import cors from 'cors';
const app = express();
import http from 'http';
const server = http.createServer(app);
import path from 'path';
import errorHandler from './controllers/errorController.js';
import AppError from './errorUtilities/AppError.js';
//const AppError = require('./utils/appError')

import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

app.use(cors());

/*
const { Server } = require("socket.io");

const {sockets} = require('./sockets')

this is a comment

const io = new Server(server,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }});

io.on('connection',(socket)=>{
    console.log('new client connected')
    sockets.push(socket)
})

*/



const port = process.env.PORT || 3000;



app.use(express.json());
app.use("/api/v1/jobs", jobs);

app.use("/api/v1/gcal", auth);

app.use('/api/v1/users',users)

app.use('/api/v1/invoices',invoice)


const staticPath = path.join(__dirname, "../ui/build")
console.log(staticPath)


app.use(express.static(staticPath));

app.get("/*", function (req, res) {
  const thePath = path.join(__dirname, "../ui/build", "index.html")
  console.log(thePath)
  res.sendFile(thePath);
});

app.get("/*", function (req, res) {
  res.send('hello world')
});

app.all("*", (req, res, next) => {
  console.log('heloooooooo')
  next(new AppError(`Cant't find ${req.originalUrl} on this server`, 404));
});

app.use(errorHandler);


server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
