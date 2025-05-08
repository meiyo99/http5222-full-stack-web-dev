console.log("Non-Blocking: Statement A - Before setTimeout is called.");

setTimeout(function() {
    console.log("Non-Blocking: Statement B - Inside setTimeout callback (executed after 1000ms delay AND after Statement C)");}, 2000);

console.log("Non-Blocking: Statement C - After setTimeout is called, but (likely) before the setTimeout callback executes.");
