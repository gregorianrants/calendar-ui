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

- change ui/src/features/jobDetails/JobDetails.js to select from the query used to get data for parent page
  (could be calendar or table), currently i am doing another network request, its fast just now but may not be when it
  isnt hosted on local server.
- consider creating nicer strings for message in error returned by api for validation errors (maybe not worth it though
  as it is only a failsafe and we should be getting nice error messages on browser side)
- implement error handling on api for unique fields (as of this note we have no unique fields but that will likely
  change)
- fix form changes size sometimes as data is entered
- lock scroll postion of portal when opening form.
- look into refreshing gcal token. is this something i need to add to the app?

# General Notes

-this article suggested an api reponse shape that i liked  
https://www.pluralsight.com/guides/centralized-error-handing-with-react-and-redux