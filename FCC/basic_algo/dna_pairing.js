
/*The DNA strand is missing the pairing element. Take each character, get its pair, and return the results as a 2d array.
Base pairs are a pair of AT and CG. Match the missing element to the provided character.
Return the provided character as the first element in each array.
For example, for the input GCG, return [["G", "C"], ["C","G"],["G", "C"]]
The character and its pair are paired up in an array, and all the arrays are grouped into one encapsulating array.*/


function pairElement(str) {
  var pairs = [["G","C"], ["A", "T"]];
  var result = [];
  for (var i = 0; i < str.length; i++){
    var ltr = str[i];
    pairs.forEach(function(pair){
      if (pair.includes(ltr)){
        var result_pair = [];
        result_pair.push(ltr);
        if (ltr == pair[0]){
          result_pair.push(pair[1]);
        }else{
          result_pair.push(pair[0]);
        }
        result.push(result_pair);
      }
      
    });
    
  }
  return result;
  
}

pairElement("GCG");
