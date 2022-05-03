import mongoose from 'mongoose'
import  {
  processMongooseError,
  convertToLodashDotPath,
} from "./processMongooseError.js"

function printAsPlainObject(err) {
  const result =
    typeof err === "object" ? JSON.parse(JSON.stringify(err)) : null;
  console.log(result);
}

function createValidatiorError() {
  const schema = new mongoose.Schema({
    name: {
      type: String,
      validate: {
        validator: function (v) {
          return v.length > 5;
        },
        message: "length should be greater than 3",
      },
    },
  });

  const doc = new mongoose.Document(
    {
      name: "he",
    },
    schema
  );

  const error = doc.validateSync();

  return error;
}

function createCastError() {
  const schema = new mongoose.Schema({
    name: { type: Number },
  });

  const doc = new mongoose.Document(
    {
      name: "hello",
    },
    schema
  );

  const error = doc.validateSync();

  return error;
}

function createNestedSchemaError() {
  const nameSchema = new mongoose.Schema({
    first: {
      type: String,
      enum: {
        values: ["jim", "tim"],
        message: "{VALUE} is not supported",
      },
    },
    last: {
      type: String,
      enum: {
        values: ["jones", "mcboatface"],
        message: "{VALUE} is not supported",
      },
    },
  });

  const schema = new mongoose.Schema({
    name: nameSchema,
  });

  const doc = new mongoose.Document(
    {
      name: {
        first: "gregor",
        last: "mcboatface",
      },
    },
    schema
  );

  return doc.validateSync();
}

function createNestedObjectError() {
  const schema = new mongoose.Schema({
    first: {
      type: String,
      enum: {
        values: ["jim", "tim"],
        message: "{VALUE} is not supported",
      },
    },
    last: {
      type: String,
      enum: {
        values: ["jones", "mcboatface"],
        message: "{VALUE} is not supported",
      },
    },
  });

  const doc = new mongoose.Document(
    {
      name: {
        first: "gregor",
        last: "murray",
      },
    },
    schema
  );

  return doc.validateSync();
}

function createArrayError() {
  const nameSchema = new mongoose.Schema({
    first: {
      type: String,
      validate: {
        validator: function (v) {
          return v.length > 5;
        },
        message: "must be longer than 2",
      },
    },
    last: String,
  });

  const schema = new mongoose.Schema({
    aList: [nameSchema],
  });

  const doc = new mongoose.Document(
    {
      aList: [
        {
          first: "gr",
          last: "murray",
        },
      ],
    },
    schema
  );

  const error = doc.validateSync();

  return error;
}

function createMixedError() {
  const schema = new mongoose.Schema({
    name: {
      type: String,
      validate: {
        validator: function (v) {
          return v.length > 5;
        },
        message: "length should be greater than 3",
      },
    },
    height: {
      type: Number,
    },
  });

  const doc = new mongoose.Document(
    {
      name: "hel",
      height: "five",
    },
    schema
  );

  const error = doc.validateSync();

  return error;
}

//console.log(convertToLodashDotPath("name.5.gregor.2.something"));

//  printAsPlainObject(createCastError());

// printAsPlainObject(createValidatiorError())

// printAsPlainObject(createMixedError());

printAsPlainObject(createNestedSchemaError());

// printAsPlainObject(createNestedObjectError());

// printAsPlainObject(createArrayError());
