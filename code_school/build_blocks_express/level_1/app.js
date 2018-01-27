// require express library
var express = require('express');

// calling the express function gives 
// us an application instance

var PORT = 8080;

var app = express();

app.get('/', function(request, response){
    response.send('Hello World');
    
});

app.get('/blocks', function(request, response){
    var blocks = ['Fixed', 'Movable', 'Rotating'];
    response.send(blocks);
});

app.get('/name', function(request, response){
    response.send("<p>Cathleen</p>");
    
});

app.get('/redirect', function(request, response){
    response.redirect(301, '/suprise');
    
});

app.get('/currentDate', function(request, response){
    var d = new Date(Date.now());
    var dd = d.getDate();
    var mm = d.getMonth() + 1;
    var yyyy = d.getFullYear();
    response.send(`The current date is ${mm}-${dd}-${yyyy}.`);
    // Simpler way: Date()
});

// bind app to port
app.listen(PORT, function(){
    console.log('listening on port...'+ PORT.toString());
});