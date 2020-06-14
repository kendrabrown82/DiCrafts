
//Vending Machine object
const vendingMachine = {
    "Snickers" : 1.00,
    "Gushers" : 0.50,
    "Gum": 0.25,
    "Potato Chips" : 1.50,
    "Soda" : 2.00,
    "Water" : 1.00

}
//array to store purchased items
let bag = [];

//--
function returnMachine(obj) {
    console.log(obj);
}

returnMachine(vendingMachine);

//--

let totalTender = 0;

function currency(userMoney) {
    console.log("Please enter money into the vending machine");
    if (typeof(userMoney) == 'number') {
        return userMoney += totalTender; 
    } else {
        return "That's not the correct kind of currency";
    }

}

//getting total tender at this moment
totalTender = currency(10);
console.log("The total tender now is " + totalTender);


//user selection which will also process items and get change
function selection(userSelection) {
    let remainder = 0;
    console.log("Please select an item");
    if(!vendingMachine[userSelection]) {
        console.log("Sorry, that item doesn't exist");
    } else if(totalTender < vendingMachine[userSelection]) {
        console.log("Sorry, that is not enough money");
    } else if (totalTender > vendingMachine[userSelection]) {
        console.log("That item costs " + vendingMachine[userSelection])
        remainder = totalTender - vendingMachine[userSelection];
        totalTender = totalTender - vendingMachine[userSelection];
        bag.push(userSelection);
    }

    return "Your change is " + remainder;
    
}

console.log(selection("Snickers"));
console.log("Total tender is now " + totalTender);

console.log(selection("Gum"));
console.log("Total tender is now " + totalTender);

console.log(selection("Water"));
console.log("Total tender is now " + totalTender);

//array
console.log("Your items are " + bag);

//eating and popping the items out of the array
while(bag.length > 0) {
    let eatenItem = bag.pop();
    console.log("I just had " + eatenItem);
    console.log(bag);
}


