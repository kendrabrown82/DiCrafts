// Write a function that takes a number as an input.
// Have it create an empty array and then push a string into the array as many
// times as the input number
//
// Name the function "finalFunction"

var arrPush = function(num) {
    var arr = [];
    var string1 = "not today";
    for(i = 0; i < num; i++) {
        arr.push(string1);
    }
    return arr;
}

console.log(arrPush(4));