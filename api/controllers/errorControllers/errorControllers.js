const {
    processValidationErrors,
} = require("../../errorUtilities/processValidationErrors");
const handleNonAppError = require('./handleNonAppError')
const AppError = require("./../../errorUtilities/AppError");

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
    console.log((err instanceof AppError)) //TODO: wouild like to skip here if error already app error
    // however instacne of
    //is giving the wrong result instead i am returning errors as is from handle non app error
    // if none of the cases are matched.
    const appError = handleNonAppError(err)
    next(appError)
}

function sendOperationalError(err, req, res, next) {
    console.log('29','helllooooo')
    if (!err.isOperational) return next()
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

module.exports = [
    setStatusAndCode,
    sendDevError,
    processNonAppError,
    sendOperationalError,
    finalHandler,
];
