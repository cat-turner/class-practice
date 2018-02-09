var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

// require the routes folder bc we are using routes
var routes = require('./api/routes');


// Define the port to run on
app.set('port', process.env.PORT);

// Add middleware to console log every request
app.use(function(req, res, next) {
  console.log(req.method, req.url);
  next(); 
});

// Set static directory before defining routes
app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', routes);

// this is to use the routes
app.use('/api', routes)

// you say api here because you want the user
// to pass in api to use the routes
// you dont have to have this. you can also 
// do just:
//app.use('/api', routes)



// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});
