//import required modules
import express from "express";
import path from "path";
import "dotenv/config";

import trakt from "./components/trakt/api.js";

const __dirname = import.meta.dirname;

//set up Express app
const app = express();
const port = process.env.PORT || 8888;

//define important folders
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
//setup public folder
app.use(express.static(path.join(__dirname, "public")));

//PAGE ROUTES
app.get("/", async (request, response) => {
  let trending = await trakt.getTrendingMovies();
  console.log(trending);
  response.render("index", { movies: trending });
});
app.get("/movie/:imdbId/studios", async (request, response) => {
  let studioList = await trakt.getStudiosByMovieId(request.params.imdbId);
  response.render("studios", { studios: studioList });
});
app.get("/anticipated", async (request, response) => {
  let anticipatedShows = await trakt.getMostAnticipatedShows();
    console.log(anticipatedShows);
    response.render("anticipated", { 
      title: "Most Anticipated Shows",
      shows: anticipatedShows 
    });
});
app.get("/show/:showId", async (request, response) => {
  let showDetails = await trakt.getShowDetails(request.params.showId);
    console.log(showDetails);
    response.render("show-details", { 
      title: `${showDetails.title} (${showDetails.year})`,
      show: showDetails 
    });
});

//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});


