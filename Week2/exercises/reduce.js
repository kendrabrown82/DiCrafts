//--
// Given an array of array of numbers like:
// Sort the array by the sum of each inner array. For the above example, the respective sums for each inner array is 8, 20, and 9. Therefore, the solution should be:
var arr = [
    [1, 3, 4],
    [2, 4, 6, 8],
    [3, 6]
  ];

//this is the main function handling the outer layer sort
function sort3(arr) {
    arr.sort(function(a, b) {
        return a.reduce(reduceFunc) - b.reduce(reduceFunc);
    })
    return arr; 
}
//this function is used to sort the individual nested arrays
function reduceFunc(c, d) {
    return c + d;
}

console.log(sort3(arr));


