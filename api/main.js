require("dotenv").config();
const db = require("./model/db");
const express = require("express");
const jobs = require("./routes/jobsRoute");
const auth = require("./routes/authRoute");
const users = require("./routes/usersRoute");
const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);
const path = require("path");
const errorHandlerChain = require("./controllers/errorControllers/errorControllers");
const AppError = require('./errorUtilities/AppError')
//const AppError = require('./utils/appError')

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

app.use(errorHandlerChain);


server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
