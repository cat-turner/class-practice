// 1.3 - Convert Bocking
/*
Not everyone knows why it's important to write non-blocking 
programs in Node.js. One of these unfortunate souls has 
written some code to read a file off the file-system 
using the blocking function readFileSync. Convert the
code to be non-blocking using the readFile function instead.
*/

var fs = require('fs');
// 1. change readFileSync() to readFile
fs.readFile('index_1_3.html', "utf8", function(error, contents){
    console.log(contents);
});
