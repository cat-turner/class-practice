
var express = require('express');

var app = express();

app.use(express.static('public'));


app.get("/blocks", function(request, response){

    var blocks = ['one', 'two', 'three'];
    if (request.query.limit >= 0){
        response.json(blocks.slice(0, request.query.limit));
        
    } else {
        response.json(blocks);
    }
    

    console.log('get request')
    response.json(blocks);
});

var blocks = {
        "one": "this is one",
        "two": "this is two",
        "three": "this is three"
};


app.get('/blocks/:names', function(request, response){
    
    var name = request.params.names;
    var description = blocks[name];
     
    if (!description){

        response.status(404).json('No description found for ' + name + '.');
        
    } else {
        response.json(description);
    }
    
    
});


app.listen(process.env.PORT);
