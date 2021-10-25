From mongoose docs 

Defining validators on nested objects in mongoose is tricky, because nested objects are not fully fledged paths.

From <https://mongoosejs.com/docs/validation.html> 

```js
let personSchema = new Schema({
  name: {
    first: String,
    last: String
  }
});

assert.throws(function() {
  // This throws an error, because 'name' isn't a full fledged path
  personSchema.path('name').required(true);
}, /Cannot.*'required'/);

// To make a nested object required, use a single nested schema
const nameSchema = new Schema({
  first: String,
  last: String
});

personSchema = new Schema({
  name: {
    type: nameSchema,
    required: true
  }
});

const Person = db.model('Person', personSchema);

const person = new Person();
const error = person.validateSync();
assert.ok(error.errors['name']);
```


Took me a while to realise 

This only applies to required, you can still validate terminal paths

My definition - terminal path: a path that refers to a value as opposed to a schema or object.

When we set a propert of a schema as a schema
E.g. 

Charges: charges schema

Each error is repeated.

Like so 


const customerObj 