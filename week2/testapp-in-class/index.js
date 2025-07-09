//import required modules
import express from "express"; //Older ES5 syntax: const express = require("express")
//The path module has some useful methods for path/URL manipulation.
import path from "path"; //const path = require("path")

//In the older ES5 (CJS -- Common JavaScript), there was a special variable called __dirname to retrieve the absolute path to the current folder. This doesn't exist in the ES6 version for Node.js.
//We can recreate it like below.
const __dirname = import.meta.dirname;

/*
//If your version of Node.js is slightly older but you're using ES6, use the following lines instead of the above (line 8):
import * as url from "url";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
*/

const app = express(); //create an Express application
const port = process.env.PORT || "8888"; //In this line, process.env means "environment variable", so process.env.PORT is referring to an environment variable named PORT. If it exists and is set, set the port number to whatever PORT is. Otherwise, set it to 8888.

//set up Express app to set the "views" setting (first argument) to use the "views" folder for the template files
//console.log(path.join(__dirname, "views"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug"); //set the app to use "pug" (Pug's package name) as the template engine ("view engine" setting)

//set up Express app to have a static file path
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (request, response) => {
  //response.status(200).send("Test page");
  response.render("index", { title: "Home" });
});
app.get("/about", (request, response) => {
  response.render("about", { title: "About" });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`); //Node.js is server-side, so a console.log() will log to the terminal NOT the browser's console (which is client-side)
});