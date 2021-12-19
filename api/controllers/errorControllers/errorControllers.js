const {
    processValidationErrors,
} = require("../../errorUtilities/processValidationErrors");
const handleNonAppError = require('./handleNonAppError')

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

function processNonAppError(err, res, res, next) {
    const appError = handleNonAppError(err)
    next(appError)
}

function sendOperationalError(err, req, res, next) {
    if (!err.isOperational) return next()
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
}

function finalHandler(err, req, res, next) {
    console.error('25', err);
    if (res.headersSent) return next(err);
    res.status(500).json({error: "Internal Error"});
}

module.exports = [
    setStatusAndCode,
    sendDevError,
    processNonAppError,
    sendOperationalError,
    finalHandler,
];
