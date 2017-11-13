
var name = "title case";


 /**
 * Return the provided string with the first letter of each word capitalized.
 */

function titleCase(str) {
    var wordsCap = str.split(" ");
    var newArr = wordsCap.map(function(x){
        var ltrs = x.split('');
        var newWord = ""
        for (var i = 0; i < ltrs.length; i++){
            if (i==0){
                newWord += ltrs[i].toUpperCase()
            } else {
                newWord += ltrs[i].toLowerCase();
            }

        }
        return newWord;
    });
  return newArr.join(" ");
}

 /**
 * Returns bool if function passes tests
 */

var expecteds = [
    ["i know right","I Know Right"],
    ["Cats are cool!","Cats Are Cool!"],
    ["HEY YOU THERE", "Hey You There"]

];

function test(expecteds){
    var result = "Pass";

    for (var i = 0; i < expecteds.length; i++){
        var input = expecteds[i][0];
        var expected = expecteds[i][1];
        var output = titleCase(input);
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