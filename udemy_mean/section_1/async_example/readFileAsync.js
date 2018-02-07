var fs = require('fs');

console.log("above");


// function : this is an anonymous callback

var file = fs.readFile('readFileSync.js',function(err,file){
    onFileLoad();
    // call the named callback
    
});

// to make this ^ testable use a named callback
// this is a "named callback"
var onFileLoad = function(){
    console.log("I got the file");
}

console.log("middle");

console.log("below");


// since this is your output, you see that reading the
// file has not interrupted your process

/*


above
middle
below
got the file
*/