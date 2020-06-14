var totalTendered = 0;
var items = {
    Snikers : 1.00,
    Gusher : 1.50,
    Gum : 0.25,
    Soda : 1.00,
    Chips: 1.50,
    Water : 1.00
};
//Bag of items
var bag = [];
var getItems = function() {
   return items;
}
function enterMoney(amount) {
     if(isNaN(amount) == false && amount) {
         totalTendered += amount;
      } else {
         console.log("What you entered is not money.");
      }
}
function makeSelection(selection) {
    if(!items[selection]) {
         console.log("No Item Exist");
    } else {
      var item_price = items[selection];
      if(item_price <= totalTendered) {
         totalTendered = totalTendered - item_price;
         return selection;
      } else {
         console.log("Not enough money to buy " + selection);
      }
   }
}
function getChange() {
    if(!totalTendered) {
       console.log("There is no money to return");
    }
    var amountToReturn = totalTendered;
    //remove all the money
    totalTendered = 0;
    return amountToReturn;
}
//Error in entering money
enterMoney("Random Paper")
enterMoney("Paperclips")
//Try to get change, returns error
getChange()
//Correctly enter money
enterMoney(1.00)
enterMoney(1.00)
enterMoney(.50)
enterMoney(.75)
//Try to vend an item that does not exist
makeSelection("Sushi")
//Make a selection that does exist
let item = makeSelection("Gum");
console.log("Adding " + item + " to my bag");
bag.push(item);
item = makeSelection("Soda");
console.log("Adding " + item + " to my bag");
bag.push(item);
item = makeSelection("Chips");
console.log("Adding " + item + " to my bag");
bag.push(item);
//Get an item with not enough money
makeSelection("Gusher");
//Get Your change
var change = getChange();
console.log("My change is " + change);
for(i=0; i<bag.length; i++) {
   console.log("I am eating my " + bag[i]);
}