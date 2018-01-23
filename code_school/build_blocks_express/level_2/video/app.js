
var express = require('express');

var app = express();

// use express' middle ware to replace code below

/*
app.get("/", function(request, response){
    // this line servers your index file
    response.sendFile(__dirname + "/public/index.html");
    
    
});
*/

// do the same thing, only using express middleware
app.use(express.static('public'));

// create a new route for the /blocks endpoint
app.get("/blocks", function(request, response){
    // create an array of blocks, and serialize it
    var blocks = ['one', 'two', 'three'];
    
    // serialize the obj to the client using the response.json
    //object
    console.log('get request')
    response.json(blocks);
});

app.listen(process.env.PORT);
