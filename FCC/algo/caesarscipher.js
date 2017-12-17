

function rot13(str) { // LBH QVQ VG!
  var decodedStr = '';
  var valA = 'AZ'.charCodeAt(0);
  var valZ = 'AZ'.charCodeAt(1);
  var AZdiff = valZ - valA;
  var shiftBy = 13;
  for (var i = 0; i < str.length; i++ ){
    var code = str.charCodeAt(i);
    if ( code <= valZ  && valA <= code){
      var valShift = code - valA + shiftBy;
      if (valShift > AZdiff){
        valShift = valShift % AZdiff - 1;
      }

      decodedStr += String.fromCharCode(valA + valShift);
      
    }else{
      decodedStr += str[i];
    }
    
  }
  return decodedStr;
}

// Change the inputs below to test
console.log(rot13("SERR PBQR PNZC"));
//FREE CODE CAMP


function rot13(str) { // LBH QVQ VG!
  var decodedStr = '';
  var valA = 'AZ'.charCodeAt(0);
  var valZ = 'AZ'.charCodeAt(1);
  var shiftBy = 13;
  for (var i = 0; i < str.length; i++ ){
    var code = str.charCodeAt(i);
    if ( code <= valZ  && valA <= code){
      var valShift = (code + shiftBy) % valZ;
      if (valShift == 0){
        valShift += valZ;
      }else if (valShift < valA){
        valShift += valA - 1;
      }
      decodedStr += String.fromCharCode(valShift);
      
    }else{
      decodedStr += str[i];
    }
    
  }
  return decodedStr;
}
