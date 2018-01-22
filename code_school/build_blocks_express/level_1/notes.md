# First Steps

Express is a web application framework for node that is 
- minimal and flexible
- great for building web apis
- used by popular services, and the foundation for other frameworks
- 

Express inherits from Node HTTP objects. This means
that express objs are nearly the same as Node objects
but with added functionality.

1. install express

```
npm install express
```
this is the latest version

to use specific version, add version after name with @ symbol

```
npm install express@XX
```


2. Start a simple hello world application

```
// require express library
var express = require('express');

// calling the express function gives 
// us an application instance

var app = express();
```

3. Create a route using get

What is a route?
"Routes" to forward the supported requests (and any information encoded in request URLs) 
to the appropriate controller functions.

more at: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes

```

app.get('/', function(request, response){
    // sends back to server respsonse
    response.send('sup.');
    
}); 

// bind app to port
app.listen(PORT, function(){
    console.log('listening on port...'+ PORT.toString());
});

```

Express has other functions, built on other http verbs, such as

- post
```
app.post()
```
- put
```
app.put()
```
- patch
```
app.patch()
```
- delete
```
app.delete()
```

4. Start server

```
node app.js
```

4. Use curl to check if your app is running

```
curl http://localhost:3000/

```

If you need to change code, you need to
stop the server.


The source code for express is idiomatic js. Use that as an example.

You can call Nodes HTTP functions. We know that some express
functions are combinations of node functions

```
// in node

response.write("...");
response.end();

// in express

response.send("...")
```

## Responding with JSON

the send function converts objects and arrays to JSON

```
app.get('/blocks', function(request, response){
    var blocks = ['Fixed', 'Movable', 'Rotating'];
    response.send(blocks);
    
});
```

## Redirect requests to relative path

The redirect function sets the proper response
headers. 

```
app.get('/blocks', function(request, response){
    response.redirect('/parts');
    
    
})
```

the status code will be 302: move temporarily (default)

pass in the status code you want if not default
http://expressjs.com/en/api.html

```
res.redirect(301, 'http://example.com');
```
