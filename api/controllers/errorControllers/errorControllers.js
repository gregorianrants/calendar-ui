// const {
//     processValidationErrors,
// } = require("../../errorUtilities/processValidationErrors");
import handleNonAppError from './handleNonAppError.js'
import  AppError from "./../../errorUtilities/AppError.js"


function printError(err,req,res,next){
    console.error(9,err)
    next(err)
}

function setStatusAndCode(err, req, res, next) {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'
    next(err)
}

function sendDevError(err, req, res, next) {
    console.log(process.env.NODE_ENV)
    if (!(process.env.NODE_ENV === 'development')) return  next(err)
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
}

function processNonAppError(err, req, res, next) {
    if(err instanceof AppError) return next(err) //TODO: wouild like to skip here if error already app error
    console.log('fuck stikcs')
    // however instacne of
    //is giving the wrong result instead i am returning errors as is from handle non app error
    // if none of the cases are matched.
    const appError = handleNonAppError(err)
    next(appError)
}

function sendOperationalError(err, req, res, next) {
    console.log('29','helllooooo')
    console.log(JSON.stringify(err,null,2))
    if (!err.isOperational) return next()//TODO should i be passing err here

    console.log('dfsdfsadfasdfasdfasdfasdfs')
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
}

function finalHandler(err, req, res, next) {
    console.error('25', err);
    if (res.headersSent) return next(err);
    res.status(500).json({status: "error", message: 'something went very wrong'});
}

export const errorHandlerChain = [
    printError,
    setStatusAndCode,
    sendDevError,
    processNonAppError,
    sendOperationalError,
    finalHandler,
];


