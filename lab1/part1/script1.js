var groceries =  ["apples", "oranges", "cherries"];

export function addItem(itemName) {
    groceries.push(itemName);
    console.log(groceries);
}

export function listLength() {
    console.log(groceries.length);
}