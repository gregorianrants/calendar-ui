import mongoose from 'mongoose';

const password = process.env.DB_PASSWORD
const dbName = process.env.DB_NAME
let  dbURI = process.env.DB_URI
//let  dbURI = "mongodb+srv://gregorian:<password>@cluster0.yq7gf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"


dbURI = dbURI.replace('<password>',password).replace('<dbname>',dbName)

console.log('dbUri',dbURI)

/*
mongoose.connect(dbURI,
    {useNewUrlParser: true, useUnifiedTopology: true
    })
*/

mongoose.connect(dbURI,
    {useNewUrlParser: true,
        useUnifiedTopology: true
    }).catch(err=>console.error(err))



/*
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});

*/




