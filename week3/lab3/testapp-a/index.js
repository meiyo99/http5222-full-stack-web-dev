//import required modules
import express from "express"; 
import path from "path"; 
import { MongoClient, ObjectId } from "mongodb";

const __dirname = import.meta.dirname;

//Set up a client and retrieve the DB
const dbUrl = "mongodb://127.0.0.1:27017/"; //localhost = 127.0.0.1
const db = new MongoClient(dbUrl).db("testdb"); //create the client and select the testdb database

const app = express(); //create an Express application
const port = process.env.PORT || "8888"; 

//set up Express app to make POST request data available through request.body
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//set up Express app to set the "views" setting (first argument) to use the "views" folder for the template files
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug"); //set the app to use "pug" (Pug's package name) as the template engine ("view engine" setting)

//set up Express app to have a static file path
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (request, response) => {
  let linkList = await getLinks();
  response.render("index", { title: "Home", links: linkList });
});
app.get("/about", async (request, response) => {
  let linkList = await getLinks();
  response.render("about", { title: "About", links: linkList });
});

//MENU LINK ADMIN PAGES/PATHS
app.get("/admin/menu", async (request, response) => {
  let linkList = await getLinks();
  response.render("menu-list", { title: "Administer menu links", links: linkList});
});
//CREATE
//Add form page
app.get("/admin/menu/add", async (request, response) => {
  let linkList = await getLinks();
  response.render("menu-add", { title: "Add menu link", links: linkList});
});
//Add form submission path
app.post("/admin/menu/add/submit", async (request, response) => {
  //For a POST form, data is passed as part of request.body, so you need to get request.body.<field_name> to get field_name's data.
  //console.log(request.body.weight);
  let newLink = {
    weight: parseInt(request.body.weight),
    name: request.body.name,
    path: request.body.path
  };
  await addLink(newLink);
  response.redirect("/admin/menu");
});


//DELETE
//Delete form submission path
app.get("/admin/menu/delete", async (request, response) => {
  //For a GET form, data is passed via the query string so you can get the field data using request.query.<field_name>
  //console.log(request.query.linkId);
  await deleteLink(request.query.linkId);
  response.redirect("/admin/menu");
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`); //Node.js is server-side, so a console.log() will log to the terminal NOT the browser's console (which is client-side)
});

//MONGODB FUNCTIONS
/*
 * Retrieve an array of all menu link documents in the menuLinks collection.
 */
async function getLinks() {
  let results = db.collection("menuLinks").find({}).sort({ weight: 1 });
  return await results.toArray(); //toArray() returns a Promise, so it's asynchronous and needs await
}

/*
 * Insert a menu link document.
 */
async function addLink(linkDoc) {
  let result = await db.collection("menuLinks").insertOne(linkDoc);
  if (result.insertedId)
    console.log("Link added successfully");
}

/*
 * Delete a document by _id value.
 */
async function deleteLink(id) {
  //new ObjectId(<existing_value>) is used to typecase the id to an ObjectId type. This way of using the ObjectId constructor is deprecated, but as of now, there doesn't seem to be an equivalent method without completely creating a new _id so we're using this (it still works).
  let deleteFilter = { _id: new ObjectId(id) };
  let result = await db.collection("menuLinks").deleteOne(deleteFilter);
  if (result.deletedCount === 1)
    console.log("Link deleted successfully");
}