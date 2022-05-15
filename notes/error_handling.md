# background

the api is essentially for a spa, can i design the api in a way that the client and api
are slightly coupled

resources

- https://stackoverflow.com/questions/12806386/is-there-any-standard-for-json-api-response-format

## some errors i am already sending from api

### validation error

```json
{
  "status": "fail",
  "message": "Invalid input data. Cast to Number failed for value \"five\" (type string) at path \"hourlyRate\". name must have more than 4 characters. must be a valid mobile number"
}
```

- should i be sending validation error details when the client should have been able to
  validate it
- if not there may be some validation on the server that doesnt get done on client client
  would need to be informed of this

### token revoked

401

```json
{
  "status": "fail",
  "message": "You are not authorized to access google calendar. you may have revoked access outside of VanCal, if so, to fix the problem revoke authorization from withing van cal then re authorize.\n                "
}
```

- should the message contain the text the client will display, does this make the api and
  client to tighly coupled
- would a name or code i van test for on the client be better then the client decides what
  it wants to say
- using a name the client tests for means that if the name changes then i need to change
  the client to
- providing message for client in the response means it only needs to change in one place.

### invalid id when getting job

```json
{
  "status": "fail",
  "message": "No job found with that id"
}
```

## a proposed alternative response shape

```json
{
  "status": "success || fail || error",
  "error": {
    "name": "UNIQUE_NAME or code",
    "message": "human readable message",
    "errors": "an object describing compund errors for validation would be a paths of validation errors - optional"
  }
}
```

#### benefits

-could test for the error using unique name

##### thoughts

-all the other resources dont tend to use a name

## a proposed alternative response shape

```json
{
  "status": "success || fail || error",
  "error or name": "unique name",
  "message": "human readable string",
  "data or errors": "an optional object typically containg a hash of validation errors"
}
```

## benefits

- less nesting is cleaner
- i like the idea of haveing a message and a name that way if the client doesnt have its
  own way of handling it via its name it can still show the message.






