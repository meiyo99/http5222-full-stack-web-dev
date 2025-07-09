import express from "express";
import path from "path";
import libraries from "./components/libraries/index.js";

const __dirname = import.meta.dirname;

const app = express();
const port = process.env.PORT || "8888";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

// Home page
app.get("/", async (request, response) => {
  let libraryData = await libraries.loadLibraries();
  response.render("index", { title: "Libraries", libraries: libraryData });
});

// library page
app.get("/library/:id", async (request, response) => {
  let libraryData = await libraries.getLibraryById(request.params.id);
  response.render("library", { title: "Library", library: libraryData });
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});