const {
  processValidationErrors,
} = require("../errorUtilities/processValidationErrors");

function handleValidationError(err, req, res, next) {
  if (!(err.name === "ValidationError")) return next(err);
  res.status(400).json({
    status: "fail",
    name: "validationError", //TODO i have changed case in error names to camel case in mongo they are capitalised is this the right decision.
    message: err.message,
    errors: processValidationErrors(err.errors),
  });
}

function handleNotFoundError(err, req, res, next) {
  if (!err.Status === 404) return next(err);
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
}

function handleError(err, req, res, next) {
  console.error(err);
  if (res.headersSent) return next(err);
  res.status(500).json({ error: "Internal Error" });
}

module.exports = {
  handleValidationError,
  handleNotFoundError,
  handleError,
};
