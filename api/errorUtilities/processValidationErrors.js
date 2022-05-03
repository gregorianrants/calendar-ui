function processCastError(err) {
    if (err.name !== "CastError") throw new Error("err is not a cast error");
    return {
      name: "castError",
      path: err.path,
      message: `you entered ${err.value} value should be a ${err.kind}`,
    };
  }

function processValidatiorError(err) {
  if (err.name !== "ValidatorError")
    throw new Error("err is not a validator error");
  return {
    name: "validatorError",
    path: err.path,
    message: err.properties.message,
  };
}

function processValidationErrors(errorsObject) {
  return Object.keys(errorsObject).map((key) => {
    const err = errorsObject[key];
    if (err.name === "CastError") return processCastError(err);
    else if (err.name === "ValidatorError") return processValidatiorError(err);
    else throw new Error(`no handler defined for Error type${err.name}`);
  });
}

export default {processValidationErrors};