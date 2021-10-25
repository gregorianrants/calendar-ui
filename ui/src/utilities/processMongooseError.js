const { cloneDeep } = require("lodash");
const { pipe, partialRight, curry, flip } = require("ramda");

const errorsObj = {
  errors: {
    customer: {
      errors: {
        name: {
          name: "ValidatorError",
          message: "name must have more than 4 characters",
          properties: {
            message: "name must have more than 4 characters",
            type: "user defined",
            path: "name",
            value: "Al",
          },
          kind: "user defined",
          path: "name",
          value: "Al",
        },
      },
      _message: "Validation failed",
      name: "ValidationError",
      message: "Validation failed: name: name must have more than 4 characters",
    },
    operatives: {
      errors: {
        value: {
          name: "ValidatorError",
          message: "name must have more than 4 characters",
          properties: {
            message: "name must have more than 4 characters",
            type: "user defined",
            path: "value",
            value: "dave",
          },
          kind: "user defined",
          path: "value",
          value: "dave",
        },
      },
      _message: "Validation failed",
      name: "ValidationError",
      message:
        "Validation failed: value: name must have more than 4 characters",
    },
  },
  _message: "Validation failed",
  name: "ValidationError",
  message:
    "Validation failed: customer.name: name must have more than 4 characters, customer: Validation failed: name: name must have more than 4 characters, operatives: Validation failed: value: name must have more than 4 characters",
};

function removeDotPaths(obj) {
  return Object.keys(obj).reduce((a, b) => {
    if (b.includes(".")) {
      return a;
    } else {
      return { ...a, [b]: cloneDeep(obj[b]) };
    }
  }, {});
}

//TO UNDERSTAND LOOK AT THIS FIRST THE FURHTER CHANGES ARE JUST TO MAKE IMMUTABLE AND FUNCTIONAL - this is a recursive function
// i realise this is pretty confusing but so are mongoose error objects
//
// function process(errorsObj, result) {
//   if (errorsObj.hasOwnProperty("errors"))
//     return process(errorsObj["errors"], result);

//   if (errorsObj.hasOwnProperty("properties"))
//     return errorsObj["properties"]["message"];

//   let builder = {};
//   for (const [key, value] of Object.entries(errorsObj)) {
//     builder[key] = process(value, {});
//   }
//   return builder;
// }

//we wrap the function purely to clone the errors obj passed to it,
//because passing oject by reference can cause bugs, this could happen if we modified the object,
//we dont modify it but i have cloned it anyway so that the object passed is forever protected from modification by this function.

function process(errorsObj) {
  function inner(errorsObj, result) {
    if (errorsObj.hasOwnProperty("errors")) return inner(errorsObj["errors"]);

    if (errorsObj.hasOwnProperty("properties"))
      return errorsObj["properties"]["message"];

    let builder = {};
    const withoutDuplicates = removeDotPaths(errorsObj); //todo proccess the object outside of function to remove all dot paths first
    for (const [key, value] of Object.entries(withoutDuplicates)) {
      builder[key] = inner(value);
    }
    return builder;
  }

  return inner(cloneDeep(errorsObj));
}

let res = process(errorsObj);

console.log(res);
