# Middleware

Rich Javascript Applications

they allow for a more interactive experience on the web

This is because the client and the server can interact withou
full page reloads.

How does this happen?

1. User accesses a page. The initial request is made to the 
server, and html is returned.
2. The page makes a series of requests through different
methods, including ajax. 
3. The server responds with data, typically with json
4. The client uses the json to update elements on the page


Middleware is basically a series of modules that are
executed before the code that executes the function
you called.

Middleware functions as a series of steps that check
things for you, and ensure that the expected  function
happens.

Let's get started with how this works.

1. Write an html file, place it in public.

index.html will do

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Building Blocks</title>
</head>
<body>
    <h1>Blocks</h1>
</body>
</html>
```

### Serving Files Static Middleware instead of sendFile
- serves static assets
- servers everything under the specified folder

2. Create your app.js file to serve your file.

3. Create a get route for your root path to serve this file
from express.

```
var express = require('express');

var app = express();

app.get('/', function(request, response){
    // this function takes the path of the file you want to serve
    response.sendFile(__dirname + '/public/index.html')
});

app.listen(PORT);
```

__dirname : returns the current path of the application.

Passing the full path to sendFile allows you to serve the file
back to the client.


3. use middleware, call the static function

you can replace that sendFile method with this:
```
\\ pass in the root folder where you want to serve the static
files from, pass the output to app.use function

app.use(express.static('public'));
```

do NOT put this line ^ in get

the static middleware defaults to serving the static index.html
file.


## Understanding Middleware

- Functions added to the stack
- Functions executed sequentially that access request and response
- Middleware has functions that involve: validation, authentication, data parsing, etc


When a request comes in, we execute series of middleware

Express is essentially the basic functionality of node
with a stack of useful middleware put onto it.

### Executing Middleware: What does the code look like in middleware?


```
// take request and response objects,
//as well as the next function to be executed in the stack
//for example, it can be validate, authenticate, etc

//(middleware A)
app.use(function(request, response, next){


// do stuff
...

// call the function you passed in to continue the stack
next();
    
});


```

You call the function in order to move to the next step in 
processing of the sequence.

All it is is passing the function into another function
within a sequence...

```
// (middleware B)
...next();

// (middleware C)
...next();
```

Until you get the point of the stack where you call send

```
app.use(function(request, response, next){

//... do stuff

response.send('done!')
//next()
// ^ remaining middleware will not run, so don't call next
// after the response has been completed

    
});
```

## Fetching a List of Blocks

- load data from Express with AJAX calls

1. Add client side js

i. add ul element in html file

```
<ul class='block-list'></ul>
```
ii. add 2 files in public:
- client.js
- jquery.js

```
// (in client.js)

$(function(){
    // perform a get request to blocks route, and pass
    // in returned object to appendToList
    $.get('/blocks', appendToList);
    
    function appendToList(blocks){
        var list = [];
        for (var i in blocks){
            list.push($('<li>', {text:blocks[i]}));
        }
        $('.block-list').append(list);
    }
    
    
});

```

download jquery
in your terminal, type:

```
wget http://bit.ly/jqsource -O jquery.js
```

or just add script from the cdn to your html file

```
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
```

iii. add endpoint /blocks to handle the get request, and return data

```
// create a new route for the /blocks endpoint
app.get("/blocks", function(request, response){
    // create an array of blocks, and serialize it
    var blocks = ['one', 'two', 'three'];
    
    // serialize the obj to the client using the response.json
    //object
    response.send(blocks);
});
```

Start your app, and check out your bulleted list.

View your items in dev tools to see what is being called.