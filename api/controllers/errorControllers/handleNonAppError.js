const AppError = require("./../../errorUtilities/AppError");

function handleValidationError(err, req, res, next) {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
}

module.exports = function handleNonAppError(err){
    if(err.name === "ValidationError"){
        return handleValidationError(err)
    }
    return err
}
