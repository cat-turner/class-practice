
var express = require('express');

var app = express();

// use uncapitalize static middleware
app.use(require('express-uncapitalize')());

app.use(express.static('public'));

// parse data
var bodyParser = require('body-parser');

// returns a middleware function
var parseUrlencoded = bodyParser.urlencoded({ extended: false});



var cities = {

    "nyc":"New York",
    "providence":"Rhode Island",
    "boston":"Massachusetts",
    "los angeles": "California",
    "miami":"florida"

}

// GET enpoint, where we can apply query to specify number of cities

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

// GET endpoint to grab state of city, from the city obj

app.get("/cities/:name", function(request, response){

    var cityName = request.params.name
    var state = cities[cityName];
    if (state){
        response.json(state);
        
    } else {
        response.status(404).json('City not found');
        
    }
    
    
});

// POST endpoint to add new city

app.post('/cities', parseUrlencoded, function(request, response){
    var newCity = request.body;
    cities[newCity.name] = newCity.state;
    response.status(201).json(newCity.name);
});

// DELETE endpoint to delete the city from the cities object

app.delete('/cities/:name', function(request, response){
    response.sendStatus(200);
});


app.listen(process.env.PORT);


