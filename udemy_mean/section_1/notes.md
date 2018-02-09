# Key points

## Video 5. How to write scalable code

Node.js is designed to address I/O scalability,
not compulational scalability

I/O - input and output
examples include
- interacting with databases
- reading and writing to files


Node is single threaded. This means there is only 
one process that is dealing all requests from all visitors

Complex functions should be run asyncronously so that
they dont slow down the process.


Node is non-blocking which means we can write process
as asynchronous to keep intensive compulational processes going.


Computational blocker

a process where the code takes quite a while to execute,
and this process can block other processes
and blocks the main process

solution: use child process
to spawn process and run computationally intensive tasks 
without blocking the main node process.

//child_process.spawn


## Video 6. Dependancy management


save dependancy in your package.json file

```
npm install express --save
```

save dependancy under the dev section

```
npm install mocha --save-dev
```

to install dependancies using package.json file

```
npm install
```


to specify a file to run when you start your application

(package.json file)
```
    "start": "node startup.js",
```

then run using

```
npm start
```

## Video 7. Express listen

Basic of starting up express and have it listening on a port

Express is a web application framework in mean stack


Use app.set and app.get to fetch and retirieve global values in your
app


```
app.set('port', process.env.PORT)

app.get('port')
```

## Video 8. Routing in Express


- We use routes so that we can listen for requests
on specifc urls

- do something on the server
- send some response


## Video 9. Serving static files with express

- defining static folders
- build basic html
- deliver css images, and js

Store all your static resources in your public folder

use app.use middleware

serve up content in your static folder as default

```
app.use(express.static(path.join(__dirname, 'public')));
```

You define the route structure in the first argument

```
app.use('/public', express.static(path.join(__dirname, 'public')));
```

We typically dont do this with the piblic folder. this is an example


## Video 10. Doing things when data comes in and doing things coming out

- what is middleware
- creating a logging function
- when and how to use middleware

You can create middleware that runs a process upon a request.
It will do something, the follow on through the next request.
Use next to do that. Bear in mind that the middlewear will run
in the order as written in the code.

// if you move the static file call here, you
// wont get anything. this is because you have rendered you
// static files before your logging function.

```
app.use(function(req, res, next){
    console.log(req.method, req.url);
    next();
    
});

(serving static files down here)
```


To define a middleware function to be called everytime 
a specific directory is added, pass in a route

```
app.use('/css', function(req, res, next){
    console.log(req.method, req.url);
    next();
    
});
```

## Video 11. using express routers

- seperations of concerns
- instantiating the router
- applying the router to a subset of routes
- testing routes using postman

use postman to test your get requests
really simple, use it to test out your routes

## Video 12. using controllers

Use controllers to power the logic of your routes

- organize code to create an API
- defining and exporting controller functions
- map controllers to routes
- get and return data


It is good practice to seperate the logic from the routing
and organize related things into logical collections

in this video we will make a single route that
when it is called will return a bunch of data from our hotels

1. create folder called api
in here put in
- controller
- routes
- data

you make a controllers file for each logical collection of 
items.

controllers are functions that are called by routes. We
do this because if we change our routes we could reuse the logic

keeping logic and routes seperated is good for code reuse.


when 
first making your application, first have your data in the form
of a json file (hard coded). THis is to get your proof of concept working

do this before starting a database

you can do this with json data

## Video 13. URL parameters in express

- what are url paramters
- defininf url parameters in routes
- using them in controllers

goal: add a route to our api that will return the data for 
one of our hotels

in apis, we can use a unique identifier

```
.../api/hotels/93474
```

we will learn about parameterizing unique ids

two key pieces:

- feed the request from your router to the controller

```
router
  .route('/hotels/:hotelID')
  .get(ctrlHotels.hotelsGetOne); // mapping a controller to a route

```
- export your controller  so that you can call it from
index.js, and the logic in it should handle the request

```
// this is the controller. it will return the data
// from the hotel provided the id
module.exports.hotelsGetOne = function(req,res){
    var hotelID = req.params.hotelID;
    var thisHotel = hotelData[hotelID];
    console.log("showing hotel");
    
  console.log("GET hotelID", hotelID);
  res
    .status(200)
    .json(thisHotel);
};
```

## Video 14. Parsing and Posting data from requests. Taking the query string data and manipulating it such that 
it will control how it is coming out.

1. get to same point as lastr video

2. add lines to handle query string parameter from the url

3. add logic for slice the data using the values obtained 
from the query

4. try it out with query string
```
https://careerdevs-cherry-blubytes1.c9users.io/api/hotels?offset=2&count=2
```

Handling data from forms

Node can't natively handle data from forms

To do that we install a piece of middleware, called body parser


```
npm install body-parser --save

```

