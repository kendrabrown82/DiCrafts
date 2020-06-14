//Write a function which takes an array of numbers as input and returns a new array containing only the positive numbers in the given array.

const posNums = function(arr) {
    const nArr = arr.filter(function(val) {
        return val > 0;
    });
    return nArr
}
let numbers = [2, -9, 1, -7, 3, -5, 8, 10, 12]
console.log(posNums(numbers));

//--
// Write a function which takes an array of numbers as input and returns a new array containing only the even numbers in the given array.
const evenNums = function(arr){
    const nEven = arr.filter(function(val) {
        return val % 2 === 0;
    });
    return nEven;
}

console.log(evenNums(numbers));

//--
// Write a function which takes an array of numbers as input and returns a new array containing result of squaring each of the numbers in the given array by two. Example: squareTheNumbers([1, 2, 3]) should give [1, 4, 9].

const squareNum = function(arr) {
    const nSquare = arr.map(function(val) {
        return val * val;
    });
    return nSquare;
}

let newNum = [1, 2, 3, 4, 5];
console.log(squareNum(newNum));

//--
// Write a function which takes an array of city objects like such:
// as input and returns a new array containing the cities whose temperature is cooler than 70 degrees.
var cities = [
    { name: 'Los Angeles', temperature: 60.0},
    { name: 'Atlanta', temperature: 52.0 },
    { name: 'Detroit', temperature: 48.0 },
    { name: 'New York', temperature: 80.0 }
  ];

const tempSeventy = function(arr) {
    const nTemp = arr.filter(function(val) {
        return val["temperature"] < 70.0;
    });
    return nTemp;
}

console.log(tempSeventy(cities));

//--
// Write a function which takes an array of city objects like the above problem as input and returns an array of the cities names.
const cityName = function(arr) {
    const nCity = arr.map(function(val) {
        return val['name'];
    })
    return nCity;
}

console.log(cityName(cities));

//--
// Given an array of people's names
// Print out 'Good Job, {{name}}!' for each person's name, one on a line.
var people = [
    'Dom',
    'Lyn',
    'Kirk',
    'Autumn',
    'Trista',
    'Jesslyn',
    'Kevin',
    'John',
    'Eli',
    'Juan',
    'Robert',
    'Keyur',
    'Jason',
    'Che',
    'Ben'
  ];

const gPeople = function(arr) {
    const nPeople = arr.map(function(val) {
        return `Good Job, ${val}!`;
    });
    return nPeople;
}

console.log(gPeople(people));

//--
// Given an array of strings such the array of names given in the previous problem, sort them by alphabetically order.
const sortArray = function(arr) {
    return arr.sort();
}

console.log(sortArray(people));

//-
// Sort the same array, but not by alphabetically order, but by how long each name is, shortest name first.
const sortLen = function(arr){
    //from within sort function, use callback function to take two variables representing items from array (names), then comparing the length of the names, and then ordering in ascending
    const nSort = arr.sort(function(a, b) {
        return a.length - b.length;
    })
    return nSort;
}
//the compare logic is, if (a - b) < 0, 'a' will be a lower index, meaning it will come first
console.log(sortLen(people));

//--
// Given an array of array of numbers like:
// Sort the array by the sum of each inner array. For the above example, the respective sums for each inner array is 8, 20, and 9. Therefore, the solution should be:
var arr = [
    [1, 3, 4],
    [2, 4, 6, 8],
    [3, 6]
  ];

const inSort = function(arr) {

}

//--
// Given this function:
// Use the call3Times function to print "Hello, world!" 3 times.
function hello() {
    console.log("Hello, world!");
}

function call3Times(fun) {
    fun();
    fun();
    fun();
  }

console.log(call3Times(hello));

//--
// You will write a function callNTimes that takes two arguments: times as a number, and fun as a function. It will call that function for that many times.
// You are allowed to use a loop in the implementation of callNTimes.
const callNTimes = function(num, fun) {
    for(let i = 0; i < num; i++) {
        fun();
    }
}

console.log(callNTimes(5, hello));

//--
// Write a function sum that takes an array of numbers as argument and returns the sum of those numbers. Use the reduce method to do this.
const rArray = [4, 5, 1, 8, 3, 9];
let sum = rArray.reduce(function(accumulator, curVal) {
    return accumulator + curVal;

});

console.log(sum);