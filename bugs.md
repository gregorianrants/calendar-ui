# do next

1. clean up error handling code in api
2. handle errors on react side
3. grey out events while data is stale

# bugs

- when click on bottom edge of event without dragging casues an error

- after dragging on a element then clicking it i get- TypeError: Cannot read properties of undefined (reading 'name')

- events drag to quickly after click. sometimes they move when jsut clicking to open

- form size changes as data entered - poss solution: make it fixed width?
- events briefly stay on page when changing week, may need to manually remove from dom before switch.

# Todo

- change ui/src/features/jobDetails/Index.js to select from the query used to get data for parent page
  (could be calendar or table), currently i am doing another network request, its fast just now but may not be when it
  isnt hosted on local server.
- consider creating nicer strings for message in error returned by api for validation errors (maybe not worth it though
  as it is only a failsafe and we should be getting nice error messages on browser side)
- implement error handling on api for unique fields (as of this note we have no unique fields but that will likely
  change)
- fix form changes size sometimes as data is entered
- lock scroll postion of portal when opening form.
- look into refreshing gcal token. is this something i need to add to the app?
- handle server error when posting data from form
- opening job modal fails if job does not have hourlyRate and there is no validation 
  to stop a job without an hourly rate being created
- not all api routes are checking for sub, for example get job just uses the id of the 
  job which works becuase you only know id of jobs you own but this is not ideal from 
  security point of view.
- when form modal gets bigger than screen it doesnt scroll. what about job details modal?
- a lot of the css depends on app bar height this is a bit of a hack i.e. see modal i 
  need to set a 64px margin on content height - consider using a global constant.
- add feature to recover deleted data
- job details fails if no charges object consider setting default value in schema
- have a look at the http methods we are using in authroute some. some of them should 
  maybe be custom methods.
- have a look at authRoute - we are mixing up auth stuff with google cal stuff at the 
  moment.
- getting validation error if i delete email think it is validating an empty string 
  because field has been touched.
- jobs list isnt sorted might look that way but try adding a new job.
- remove sub from client side
- when i create invoice i am using the client version of job to create the invoice is 
  this the corect way to do this, should be using server version, what if server 
  version has changed since client recieved it but at same time i want to be able to 
  see job data on client before i create invoice, perhaps i should through an error if 
  client data does not match server data?

# General Notes

-this article suggested an api reponse shape that i liked  
https://www.pluralsight.com/guides/centralized-error-handing-with-react-and-redux