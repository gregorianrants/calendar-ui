require('dotenv').config()
const db = require('./model/db')
const express = require('express')
const jobs = require('./routes/jobsRoute')
const cors = require('cors')
const app = express()
const http = require('http');
const server = http.createServer(app);
const path = require('path');
const errorHandlers = require('./middleware/errorHandlers')

app.use(cors())

/*
const { Server } = require("socket.io");

const {sockets} = require('./sockets')



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

app.use(express.static(path.join(__dirname, '../build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

const port = process.env.PORT || 3000

app.use(express.json());
app.use('/api/v1/jobs',jobs)
app.use(errorHandlers.handleValidationError)
app.use(errorHandlers.handleError)
app.use(errorHandlers.notFound)


server.listen(port,()=>{
    console.log(`listening on port ${port}`)
})









