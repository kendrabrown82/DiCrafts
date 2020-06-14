var totalTendered = 0;
var items = {
    Snickers : 1.00,
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
     if(isNaN(amount) == false) {
                 totalTendered += amount;
      } else {
         console.log("You entered the wrong amount");
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