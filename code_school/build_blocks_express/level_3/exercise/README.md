CodeSchool Express Level 3

Create a simple express node app meeting the following requirements Continue using the app from level 2.

Requirements

Create an express app.

- A /cities route that will display all cities. (minimum of 5 cities)
- The /cities route should accept a limit query that will send back:
    * The number of cities requested
    * All cities if 0 is provided or if limit query is omitted
    * return a status error if the limit is higher than the number of cities available in the list
- Add a dynamic route to /cities. This should respond with the state that the city resides in.
- Dynamic route should return Not Found status code if the requested city is not available.
- Make sure to also normalize the data sent in the /cities route. The city sent should be sendable 
  in any case and still find the state it’s in. ie Providence and providence should both return
  Rhode Island.
- Your normalizing of the data should use a middleware function.
- The /cities route should still display 
- The other routes only need be accessed by curl currently
