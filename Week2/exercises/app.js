function hello(name) {
    if (name) {
        return `Hello ${name}`;
    } else {
        return 'Hello, world!';
    }
    
  }

console.log(hello());

//--
// Write a madlib function, which is given a name and a subject. It will return(not print) a new string: (name)'s favorite subject in school is (subject).
const madlib = function(name, subject) {
    return `${name}'s favorite subject in school is ${subject}.`;
}

console.log(madlib("John", "science"));

//--
// Write a function tipAmount that is given the bill amount and the level of service (one of good, fair and poor) and returns the dollar amount for the tip.
function tipAmount(bill, service) {
    if (service === 'good') {
        return bill * .20;
    } else if (service === 'fair') {
        return bill * .15;
    } else if (service === 'bad') {
        return bill * .10;
    }
}

console.log(tipAmount(100, "fair"));

//--
// Write a function totalAmount that takes the same arguments as tipAmount except it returns the total as the tip amount plus the bill amount. This function may make use of tipAmount as a sub-task.
function totalAmount(bill, service, func) {
    let total =  bill + func(bill, service);
    return total;
}

console.log(totalAmount(100, "fair", tipAmount));

//--
// Write a function splitAmount that takes the bill amount and the level of service, and the number of people to split the bill between. It will return the final amount for each person.
function splitAmount (bill, service, patrons, func) {
    let tip = func(bill, service);
    return (tip + bill) / patrons;
    

}

console.log(splitAmount(100, 'good', 5, tipAmount));
console.log(splitAmount(40, 'fair', 2, tipAmount));

//--
// Write a function printNumbers which is given a start number and an end number. It will print the numbers from one to the other, one per line:
const printNumbers = function(first, last) {
    for(let i = first; i <= last; i++) {
        console.log(i)
    }
}

console.log(printNumbers(5, 10));

//--
// Write a function printSquare which is given a size and prints a square of that size using asterisks.
function printSquare(num) {
    let items  = "";
    for (let i = 0; i < num; i++){
        for (let j = 0; j < num; j++){
            items += '#';
        }
            items += '\n';
    }
    return items;

}
console.log(printSquare(4));


//--
// Write a function sumNumbers which is given an array of numbers and returns the sum of the numbers.
function sumNumbers(arr) {
    let total = 0;
    for(let i = 0; i < arr.length; i++) {
        total += arr[i];
    }
    return total;
}
console.log(sumNumbers([1, 4, 8]));

//--
// Write a function positiveNumbers which is given an array of numbers and returns a new array containing only the positive numbers within the given array.
const positiveNumbers = function(arr) {
    let newArr = [];
    for(let i = 0; i < arr.length; i++) {
        if (arr[i] > 0) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}

console.log(positiveNumbers([1, -3, 5, -3, 0]));

//--
// Write a function factors which is given a number and returns an array containing all its factors. What are factors?
function factors(num) {
    let nArray = [];
    let divisor = num;

    while(divisor > 0) {

        if(120 % divisor === 0) {
            nArray.push(divisor);
        }
        divisor--;
    }
    return nArray;
}

console.log(factors(120));

