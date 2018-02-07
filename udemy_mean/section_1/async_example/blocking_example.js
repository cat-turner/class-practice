
var child_process = require('child_process');

console.log(1);



// method 1: blocking example

//var fib = require('./fibonacci.js');
/*
you will see this in your console

1
267914296
2
*/

// method 2: non blocking example

//     stdio : 'inherit'

// we use this option to see the output in the console.

var newProcess = child_process.spawn('node', ['fibonacci.js'], {
    stdio : 'inherit'
});

// you will see that complicated process is no longer blocking
// the same process

//Key: do not block the main process 
// this allows us to have computational scalability

/*
1
2
267914296
*/


console.log(2);

// spawn a child process to run this node
// command such that it will run another process

// it will take some computational resources and
// wont block the main node driver

