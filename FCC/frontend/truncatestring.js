
var name = "palidrome";


 /**
 * Returns bool if given string is palidrome.
 */


function truncateString(str, num) {
  // Clear out that junk in your trunk
  var truncWord = "";
  var i = 0;
  while(truncWord.length < num){
    truncWord += str[i];
    i += 1;
  }
  if (truncWord.length > 3){
    truncWord = truncWord.split('')
    truncWord.splice(3).join('');
  }
  return truncWord + '...';
}

truncateString("A-tisket a-tasket A green and yellow basket", 11);


 /**
 * Returns bool if function passes tests
 */
var expecteds = [
    ["A-tisket a-tasket A green and yellow basket", 11, "A-tisket..."],
    ["Peter Piper picked a peck of pickled peppers", 14, "Peter Piper..."],
    ["A-", 1, true],
    ["Open sesame", "pen", false],
    ["He has to give me a new name", "name", true]

];


function test(expecteds){
    var result = "Pass";

    for (var i = 0; i < expecteds.length; i++){
        var inputs = [expecteds[i][0], expecteds[i][1]];
        var expected = expecteds[i][2];
        var output = truncateString(inputs[0], inputs[1]);
        if (output !== expected){
            console.log("failure at " + inputs);
            console.log("actual: " + output);
            console.log("expected:" + expected);
            result = "Fail";
        }
    }

    return result;
}


console.log("Test: " + name);
console.log("Result: " + test(expecteds));