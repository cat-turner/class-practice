
var name = "truncatestring";


 /**
 * Returns bool if given string is palidrome.
 */


function truncateString(str, num) {
  // Clear out that junk in your trunk
  if (num < str.length){
      var limit = num;
      if (str.length > 3 && num > 3){
          limit -= 3;
      }
      var truncWordArr = str.split('');
      truncWordArr.splice(limit, str.length - limit, '...');
      var truncWord = truncWordArr.join('');
      return truncWord;
  }else{
      return str;
  }
  
}

truncateString("A-tisket a-tasket A green and yellow basket", 11);


 /**
 * Returns bool if function passes tests
 */
var expecteds = [
    ["A-tisket a-tasket A green and yellow basket", 11, "A-tisket..."],
    ["Peter Piper picked a peck of pickled peppers", 14, "Peter Piper..."],
    ["A-tisket a-tasket A green and yellow basket", "A-tisket a-tasket A green and yellow basket".length, "A-tisket a-tasket A green and yellow basket"],
    ["A-tisket a-tasket A green and yellow basket", "A-tisket a-tasket A green and yellow basket".length + 2, "A-tisket a-tasket A green and yellow basket"],
    ["A-", 1, "A..."],
    ["Absolutely Longer", 2, "Ab..."]

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