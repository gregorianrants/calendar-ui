#Invoice Feature

##some references
- https://www.invoiced.com/resources/docs/api/#introduction could be intresting to 
  look at as it is an invoicing api i am not reall copying this but gt some ideas from it.
- https://livebook.manning.com/book/api-design-patterns/chapter-9/30

##requirements

a user should be able to:

- create an invoice record on db from the data held in a job record.
- email that invoice  either from there own domain or from the email client on
  the device they are using the application on.
- void an invoice

ui should provide
- a way to see what job records have:
  - had an invoice created
  - have had an invoice sent
  - have had an invoice sent but invalidated
- a way to create and send an invoice.
- a way to see all invoices
- a way to see invoices for a certain booking as some bookings may have multiple 
  invoices due to marking 

ui features
- a list of job records showing the current invoice state:
  - not created, created, sent, invalidated
- a page that can be opened from the booking records list to see all details for the 
  booking, any invoice records and perform invoice actions - create, email , invalidate
- a list of invoice records to summarise information about invoices e.g bill, paid 
  and calculate summary statistics.

##api needs

- an invoice model, which will contain the fields on the job model, but with more 
  strict validation.
  - move the object which sets up the job model up to a shared file jobObj.js job and 
    invoice then both import this file and make some modifications to it, it will 
    mainly be invoice.js that changes this as it is imposing more strict validation.
- a way of marking the job.js model as validated for invoice so that it can easily be 
  checked
  -use a virtual property on job.js which uses the invoice.js validation to check if 
  it is validated as an invoice and sets readyForInvoice to true if it passes.

- to be able to generate a pdf invoice from the data on the invoice.js model. and send
- to be able to email that pdf
  - see notes on emailing invoice
- the invoice should have a number of enumerated states e.g. prepared,
  generated,pending,sent,void.

##emailing invoice
user could create a dedicated email address on there domain for there business e.g. 
invoice@manwithavanglasgow.com, and provide this to app. because it is only being used 
by app then the app does not have access to any of the users other emails and it is 
secure. if user doesnt want to provide this then app could fall back to using email 
client on the device app is running on.

####what kind of endpoint should the api have to facilitate sending the email?
possible solution (scratched)
- we post to /invoice on creation
- the controller does the folowwing and enumerates the state field at each step
  - creates the invoice
  - generates the pdf
  - sends the invoice
  
if any of them fails the return just sends back with the enumerated state and the user can 
retry later 

optional extra: we could create some sort of retry system if anything fails and send 
back some sort of long running operation response.

solution:
in api design patterns https://livebook.manning.com/book/api-design-patterns/chapter-9/
JJ geewax recomends using custom method when sending an email

also see https://github.com/expressjs/express/issues/3857 - putting a colon in request

##what kind of ui do we need to manage invoicing

need to be able to do the following
- prepare booking s



