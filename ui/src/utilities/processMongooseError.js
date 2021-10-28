const { get, set } = require("lodash");

function convertToLodashDotPath(mongooseDotPath) {
  return mongooseDotPath.replace(/\d+/g, (match) => {
    return `[${match}]`;
  });
}

function isValidatorError(err) {
  if (err.name === "ValidatorError") return true;
  return false;
}

function getValidatorMessage(err) {
  return err.message;
}

function isCastError(err) {
  if (err.name === "CastError") return true;
  return false;
}

function getCastMessage(err) {
  return `should be a ${err.kind}`;
}

function processMongooseError(err) {
  if (!err) return null;
  const result = {};

  for (let [key, value] of Object.entries(err.errors)) {
    const path = convertToLodashDotPath(key);
    console.log(path);
    if (isCastError(value)) set(result, path, getCastMessage(value));
    else if (isValidatorError(value)) {
      set(result, path, getValidatorMessage(value));
    }
  }
  return result;
}

module.exports = { processMongooseError, convertToLodashDotPath };
