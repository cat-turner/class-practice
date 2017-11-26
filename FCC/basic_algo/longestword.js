
var name = "longest word";


 /**
 * Return the length of the longest word in the provided sentence.
 */

function findLongestWord(str) {
    var words = str.split(" ").map(w => w.replace(/[\W_]/g, ""));
    var wordLengths = words.map( w => w.length);

    return wordLengths.reduce(function(a,b){
        return Math.max(a,b);

    });
}

 /**
 * Returns bool if function passes tests
 */

var expecteds = [
    ["The quick brown fox jumped over the lazy alligator",9],
    ["to be or no to be",2],
    ["Cats are cool!",4]

];

function test(expecteds){
    var result = "Pass";

    for (var i = 0; i < expecteds.length; i++){
        var input = expecteds[i][0];
        var expected = expecteds[i][1];
        var output = findLongestWord(input);
        if (output !== expected){
            console.log("failure at " + input);
            console.log("actual: " + output);
            console.log("expected:" +expected);
            result = "Fail";
        }
    }

    return result;
}

console.log("Test: " + name);
console.log("Result: " + test(expecteds));