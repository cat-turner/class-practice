
var name = "confirm the ending";


 /**
 * Check if a string (first argument, str) ends with the given target string (second argument, target).
 */

function confirmEnding(str, target) {
  // "Never give up and good luck will find you."
  // -- Falcor
  var arr = str.split(" ");
  var lastWord = arr[arr.length-1];
  var fidx = lastWord .length;

  for (var i = target.length-1; i >= 0; i--){
    fidx -= 1;
    if (target[i] !== lastWord [fidx]){
 
      return false;
    }
  }
  return true;

}

 /**
 * Returns bool if function passes tests
 */

var expecteds = [
    ["Bastian", "n", true],
    ["Connor", "n", false],
    ["Open sesame", "same", true],
    ["Open sesame", "pen", false],
    ["He has to give me a new name", "name", true]

];

function test(expecteds){
    var result = "Pass";

    for (var i = 0; i < expecteds.length; i++){
        var inputs = [expecteds[i][0], expecteds[i][1]];
        var expected = expecteds[i][2];
        var output = confirmEnding(inputs[0], inputs[1]);
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