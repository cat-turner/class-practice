var fs = require('fs');

console.log("above");

// reads in a file from the file system
var file = fs.readFileSync('readFileSync.js');
console.log("middle");

console.log("below");

// what you should see in the console.

/*
1: I start
3: I end
2: In the set Timeout
*/