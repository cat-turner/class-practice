
var express = require('express');

var app = express();

app.use(express.static('public'));

var bodyParser = require('body-parser');

// returns a middleware function
var parseUrlencoded = bodyParser.urlencoded({ extended: false});
var blocks = {
        "one": "this is one",
        "two": "this is two",
        "three": "this is three"
};


// endpoint to get blocks

app.get("/blocks", function(request, response){

    var blockskeys = Object.keys(blocks);
    if (request.query.limit >= 0){
        response.json(blockskeys.slice(0, request.query.limit));
        
    } else {
        response.json(blockskeys);
    }

});

// endpoint to get their description

app.get('/blocks/:names', function(request, response){
    
    var name = request.params.names;
    var description = blocks[name];
     
    if (!description){

        response.status(404).json('No description found for ' + name + '.');
        
    } else {
        response.json(description);
    }
    
    
});

// create an endpoint to posting to the blocks path

app.post('/blocks', parseUrlencoded, function(request, response){
    var newBlock = request.body;
    console.log(newBlock);
    blocks[newBlock.name] = newBlock.description;
    response.status(201).json(newBlock.name);
});

// create an endpoint to delete bocks

app.delete('/blocks/:name', function(request, response){
    //delete blocks[request.blockName];
    response.sendStatus(200);
    console.log(blocks);
});


// listen on port
app.listen(process.env.PORT);
