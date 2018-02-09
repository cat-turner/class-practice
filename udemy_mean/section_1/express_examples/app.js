var express = require('express');

var app = express();
var path = require('path');

app.set('port', process.env.PORT)

// if you move the static file call here, you
// wont get anything. this is because you have rendered you
// static files before your logging function.

app.use(function(req, res, next){
    console.log(req.method, req.url);
    next();
    
});

// to define a middleware function to be called everytime 
// a specific directory is added, pass in a route

/*
app.use('/css', function(req, res, next){
    console.log(req.method, req.url);
    next();
    
});
*/


// be sure to have this after your middlewear
// this is to ensure 
app.use('/', express.static(path.join(__dirname, 'public')));



app.get('/json', function(req, res){
    console.log('get json');
    res
        .status(200)
        .json({"jsonData": true});
    
});


app.get('/file', function(req, res){
    console.log('GET the file');
    res
        .status(200)
        .sendFile(path.join(__dirname, 'app.js'));
});

var server = app.listen(app.get('port'), function(){
    
    // extract variable from server object
    var port2 = server.address().port;
    
    //console.log("listening on port " + app.get('port'));
    console.log("listening on port " + port2);
});

console.log("Im first!");