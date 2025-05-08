var groceries =  ["apples", "oranges", "cherries"];

export function addItem(item) {
    groceries.push(item);
    console.log(groceries);
}

export function listLength() {
    console.log(groceries.length);
}