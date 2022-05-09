import handleNonAppError from "../errorUtilities/handleNonAppError.js";

function isDevEnv(){
    return process.env.NODE_ENV === 'development'
}

function isOperationalError({err, req, res, next}){
    return err.isOperational
}

function printError(err, req, res, next) {
    console.error(9, err)
}

function sendDevError({err, req, res, next}) {
    res.status(500).json({
        error: err,
        message: err.message,
        stack: err.stack,
    });
}

function sendOperationalError({err, req, res, next}) {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
}

function sendCatchAll({err, req, res, next}) {
    if (res.headersSent) return next(err);
    res.status(500).json({status: "error", message: 'something went very wrong'});
}

export default function errorPipeLine(err,req,res,next){
    printError()
    if(isDevEnv()) return sendDevError({err, req, res, next})
    err = handleNonAppError(err)
    if(isOperationalError({err})) return sendOperationalError({err, req, res, next})
    return sendCatchAll({err, req, res, next})
}