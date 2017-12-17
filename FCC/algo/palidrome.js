
var name = "palidrome";


 /**
 * Returns bool if given string is palidrome.
 */

function palindrome(str) {
  // remove non alpha numeric chars
  var cleanStr = str.replace(/[\W_]/g, "");
  var end = cleanStr.length-1;
  var start = 0;

  do
  {

    if (cleanStr[start].toLowerCase() !== cleanStr[end].toLowerCase()){
      return false;

    }

    start += 1;
    end -= 1;

  } while (end > start);
  return true;
  
}

 /**
 * Returns bool if function passes tests
 */

var expecteds = [
    ["eye", true],
    ["_eye", true],
    ["0_0 (: /-\ :) 0-0", true],
    ["almostomla", false],
    ["d1ogd", false]

];

function test(expecteds){
    var result = "Pass";

    for (var i = 0; i < expecteds.length; i++){
        var input = expecteds[i][0];
        var expected = expecteds[i][1];
        var output = palindrome(input);
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