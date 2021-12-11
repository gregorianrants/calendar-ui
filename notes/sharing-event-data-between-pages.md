#Problem: Calendar and Table need data from the same api endpoint

because: Data is currently in calendar reducer so how does table get its data

- solution: I could give each component its own data, 
	
  - Problem: If one component modifies data – currently done with modal over route - then how do we keep other component up to date.

  - Possible solution 
  Components data is cleared when removed from ui, and refreshed when added to ui, therefore only need to keep the current component up to date.

    - Problem
    Need to let form know which component to keep up to date, its doable but would make code confusing.

    - Possible solution
     Don’t make form a modal – give it its own route

- Possible solution: Events has its own reducer separate from the pages

- Problem Logic to update events could be complex.

##a thought
A thought, each page could have its own data, they use the same forms but pass the forms there thunks for on submit etc. they use optimistic update logic for the page they are displayed on, and cause the other pages to do a refetch of data, doesn’t matter if other pages are a bit slower as they are not displayed.
Eventually the data will be refreshed by websockets anyway.
Potential ugliness, would need to import the thunks to app and then pass correct thunk to form depending on what route it is rendered in.

##a thought
An idea of how to update a top level reducer to store events for all pages
Its pretty messy but thought I would write it down while the idea occurred to me.

```js
state = {
Events:{id: event,id: event},
Page: ['id’s for events in page'],
Week: ['id’s for events in week'],
}

```
Test if updated/new event belongs in page and week if so update/add id.
Then filter events to be only those event id’s in page and in week.
Test if page is write length, if to long or to short then do a refetch.
