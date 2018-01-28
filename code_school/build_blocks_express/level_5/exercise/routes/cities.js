var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false});

var cities = {

    "nyc":"New York",
    "providence":"Rhode Island",
    "boston":"Massachusetts",
    "los angeles": "California",
    "miami":"florida"

};

router.route('/')
    .get(function(request, response){
        
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
        
    })
    .post(parseUrlencoded, function(request, response){
        var newCity = request.body;
        cities[newCity.name] = newCity.state;
        response.status(201).json(newCity.name);
    });

router.route('/:name')
    .get(function(request, response){
    
        var cityName = request.params.name
        var state = cities[cityName];
        if (state){
            response.json(state);
            
        } else {
            response.status(404).json('City not found');
            
        }
    })
    .delete(function(request, response){
    response.sendStatus(200);
    });



module.exports = router;