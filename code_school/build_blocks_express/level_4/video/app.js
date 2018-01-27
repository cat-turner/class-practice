
var express = require('express');

var app = express();

app.use(express.static('public'));

app.get("/test", function(request, response){
    
    response.json("hi");

});


// listen on port
app.listen(process.env.PORT);