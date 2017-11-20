
var name = "largest of four";


 /**
 * Return an array consisting of the largest number from each provided sub-array. 
 */

function largestOfFour(arr) {
  // You can do this!
  return arr.map(function(x){
      return x.reduce(function(a,b){
          return Math.max(a,b);
      });
      
  });
}

 /**
 * Returns bool if function passes tests
 */

var expecteds = [
    [[[2, 3, 4],[22,1,6],[7,0,1,3]],[4,22,7]],

];

function test(expecteds){
    var result = "Pass";

    for (var i = 0; i < expecteds.length; i++){
        var input = expecteds[i][0];
        var expected = expecteds[i][1];
        var output = largestOfFour(input);
        if (!intArraysEqual(output,expected)){
            console.log("failure at " + input);
            console.log("actual: " + output);
            console.log("expected:" +expected);
            result = "Fail";
        }
    }

    return result;
}


function intArraysEqual(a,b) {
        if (a.length == b.length){
            for (var i = 0; i < a.length; i++){
                if (a[i] != b[i]){
                    return false;
                }
            }
            return true;
        }
        return false;
    }

console.log("Test: " + name);
console.log("Result: " + test(expecteds));
