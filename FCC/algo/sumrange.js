function sumAll(arr) {
  var sum_vals = 0;
  var start_val = Math.min(arr[0], arr[1]);
  var end_val = Math.max(arr[0], arr[1]);
  var total = 0;
  for (var i = start_val; i <= end_val; i++) {
      console.log(i);
    total += i;
  }
  return total;
  
}

sumAll([1, 4]);