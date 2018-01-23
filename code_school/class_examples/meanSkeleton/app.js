

// express library

var express = require('express')

var app = express();

// refers to the http method get. This
// is a get request.
// use a call back function to load the page


app.get("/", function(request, response){
    // you get request first, then response
    
    //__dirname: js' version of 'root' dir for the app
    response.sendFile(__dirname + "/public/index.html");
    
    
});


//listen for incoming signals on this port.

app.listen(process.env.PORT);