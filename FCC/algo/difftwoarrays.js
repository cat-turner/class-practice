function diffArray(arr1, arr2) {
  var newArr = [];
  arr1.forEach(function(val){
    var index = arr2.indexOf(val);
    if (index != -1){
        arr2.splice(index, 1);
    }else{
      newArr.push(val);
    }
    
  });
  var result = newArr.concat(arr2);
  console.log(result);
  return result;
}

diffArray(["andesite", "grass", "dirt", "pink wool", "dead shrub"], ["diorite", "andesite", "grass", "dirt", "dead shrub"]);
