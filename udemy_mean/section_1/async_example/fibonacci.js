var recursion = function(n){
    if (n <= 2){
        return 1;
    } else {
        return recursion(n - 1) + recursion(n - 2);
    }
};

console.log(recursion(42));