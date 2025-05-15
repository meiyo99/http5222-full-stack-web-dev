var num1 = 3;
var num2 = 0;

// Example of blocking code - Statement 2 will not execute until the while loop is finished
while (num2 < num1) {
    num2 += 1;
    console.log("Statement 1: Inside while loop, num2 is now: " + num2);
}

// Example of non-blocking code - Statement 4 will execute immediately after statement 2
console.log("Statement 2");

// Using setTimeout to simulate non-blocking behavior
// This will execute after 2 seconds, allowing statement 4 to run immediately
setTimeout(function(){
    console.log("Statement 3: Called before statement 4");
}, 2000);

console.log("Statement 4");