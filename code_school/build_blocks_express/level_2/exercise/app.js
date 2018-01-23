
var express = require('express');

var app = express();

app.use(express.static('public'));

app.get("/cities", function(request, response){
    
    var cities = ["NYC", "Paris", "Cario", "Tokyo"];
    response.json(cities);
    
});

app.listen(process.env.PORT);


