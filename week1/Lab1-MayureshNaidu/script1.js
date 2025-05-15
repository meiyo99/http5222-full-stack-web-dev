// Creating a private array (groceries) that stores grocery items.
var groceries =  ["apples", "oranges", "cherries"];

// Creating and exporting a function that adds an item to the groceries array using a parameter
export function addItem(itemName) {
    groceries.push(itemName);
    console.log(groceries);
}

// Creating and exporting a function that lists the length of the groceries array
export function listLength() {
    console.log(groceries.length);
}