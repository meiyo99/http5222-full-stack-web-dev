import express from "express";
import path from "path";

// Used to retrieve the absolute path to the current folder
const __dirname = import.meta.dirname;

const app = express(); //Creates an express application
const port = process.env.PORT || "8888";

// Set up the express app to set the "views" setting (first argument) to use the "views" folder for the template files
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug"); //set the app to use "pug" (Pug's package name) as the template engine ("view engine" setting)

//Set up our express ap to have static file path
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (request, response) => {
    //response.status(200).send("Test Page");
    response.render("index", { title: "Home" })
});
app.get("/about", (request, response) => {
    //response.status(200).send("Test Page");
    response.render("about", { title: "About" })
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});