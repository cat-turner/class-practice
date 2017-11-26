var name = "chunkymonkey";

 /**
 * Group list elements into an array
 */

function chunkArrayInGroups(arr, size) {
  // Break it up.
  var arrLen = arr.length;
  var rem = arrLen % size;
  var nBins = (arrLen - rem)/size;
  var chunkArr = [];
  var startIdx = 0;
  var endIdx = 0;
  for (var i = 0; i < nBins; i++){
    endIdx += size;
    chunkArr.push(arr.slice(startIdx, endIdx));
    startIdx = endIdx;
  }
  var remainArr = arr.slice(startIdx, startIdx+rem);
  if (remainArr.length > 0){
    chunkArr.push(remainArr);
  }
  return chunkArr;
}

console.log(chunkArrayInGroups(["a", "b", "c", "d"], 2));