# Reading from the URL

- Read user-submitted data from within our express routes
- Intercept requests before it reaches the routes
- Give a chance to run precondition code to manipulate data
  before the routes pass the data

## Using parameters to limit inputs returned

GET to/blocks?limit=1

Query aren't part of the path, and come after "?"

this query will return 1 block

### Reading query string parameters

Use request.query to access query strings, and slice the
array.

```
var express = require('express');

var app = express();

app.use(express.static('public'));


app.get("/blocks", function(request, response){

    var blocks = ['one', 'two', 'three'];
    if (request.query.limit >= 0){

        response.json(blocks.slice(0, request.query.limit));
        
    } else {
        response.json(blocks);
    }
    

    console.log('get request')
    response.json(blocks);
});

app.listen(process.env.PORT);
```

## Returning description for a specific block

we can use meaningful urls to return a description for specific
types of blocks.

Goal: To send the block name to the server using a get request.

Return 200 success and a text description.

For example...
```
GET to /blocks/Fixed

returns "Fastened securly in position"

GET to /blocks/Movable

"Capable of being moved"

```

How can we do this without using static routes?
The answer is to use dynamic routes.

## Creating Dynamic Routes
Use named arguments as part of the url path.

This can be done with placeholders.

```
// (how you pass in the route)
'/blocks/:name'
```

this route creates the name property on the
request.params object

```
// (how you access the data using js)
request.params.names
```

We will need to store additional information on each block
from here, we will change to code from an array
to an object.

```
// (from this)
var blocks = ['one', 'two', 'three'];

// to this
var blocks = {
    "one": "this is one",
    "two": "this is two",
    "three": "this is three"
}

```

this object will allow data to be accessed from other routes,
simply by defining the parameter.

now access the data using the params object of response object.

```
app.get('/blocks/:names', function(request, response){
    
    var name = request.params.names;
    var description = blocks[name];
    response.json(description);
    
});
```

and access the data from the ur;

```
https://careerdevs-cherry-blubytes1.c9users.io/blocks/three
```

## Handling requests from blocks that do not exist

- Return a 404 status code
- 404: not found

How to handle those?

You have to add code for this logic. If you were to
pass in "p" now, you would get a status response 200 OK,
eventhough you have nothing to handle this request.

```
https://careerdevs-cherry-blubytes1.c9users.io/blocks/p
(you see nothing in the page)
```

For invalid requests return a 404 status code, which means not found.

You should include an error in the response body, which
should inform the user what went wrong.

This is handled in js, because if you pass in a that value in 
the object, and its not defined, you get undefined.

This is easily available in express.

i. Set the status code to 404

```
response.status(404)
```

ii. Call the json function to compose an informative error message

```
response.status(404).json('No description found for ' + name + '.');
```

include the name in the request.



















