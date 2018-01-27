
var express = require('express');

var app = express();

// use uncapitalize static middleware
app.use(require('express-uncapitalize')());

app.use(express.static('public'));

var cities = {

    "nyc":"New York",
    "providence":"Rhode Island",
    "boston":"Massachusetts",
    "los angeles": "California"

}

app.get("/cities", function(request, response){
    
    var limit = request.query.limit;
    var cityNames = Object.getOwnPropertyNames(cities);
    var citiesCount = cityNames.length;
    
    if(limit > 0 && limit < citiesCount){

        response.json(cityNames.slice(0,limit));
        
    } else if (limit > citiesCount){

        response.status(404).json('Limit number exceeds the length of city');
        
    } else {
        response.json(cityNames);
        
    }
    
});


app.get("/cities/:name", function(request, response){

    var cityName = request.params.name
    var state = cities[cityName];
    if (state){
        response.json(state);
        
    } else {
        response.status(404).json('City not found');
        
    }
    
    
});

app.listen(process.env.PORT);


