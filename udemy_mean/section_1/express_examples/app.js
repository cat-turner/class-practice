var express = require('express');

var app = express();
var path = require('path');

app.set('port', process.env.PORT)

// some middleware

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