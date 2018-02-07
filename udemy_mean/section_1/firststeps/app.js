require('./instanthello'); // best practice not to use .js
var goodBye = require('./talk/goodbye');

var talk = require('./talk')
// if you have an index.js file in a folder, you don't
// have to specify the name of the file itself

var question = require('./talk/question');


// call the function to use it
goodBye();

talk.hello("jummy");
talk.intro();

// call questions

var answer = question.ask("whats your name");
console.log(answer);