var not_exposed = "index.js";

var hello = function(name){
    console.log("Hello " + name + not_exposed);
    // this variable will still show up in your console.
};

var intro = function(){
    console.log("I am a node file called index.js");
}

// expose your functions 

module.exports = {
    hello : hello,
    intro : intro
};