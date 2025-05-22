import express from "express";
import path from "path";

const __dirname = import.meta.dirname;

const app = express();
const port = process.env.PORT || "8888";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (request, response) => {
    response.render("index", { title: "Welcome to Biblichor" })
});

app.get("/about", (request, response) => {
    response.render("about", { title: "About Biblichor" })
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
