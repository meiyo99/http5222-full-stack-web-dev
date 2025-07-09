const trakt = "https://api.trakt.tv"; //base URL for any Trakt API requests

/*
 * Functions for Trakt API requests.
 */

//Function to retrieve a list of trending movies.
async function getTrendingMovies() {
  const reqUrl = `${trakt}/movies/trending?limit=15&extended=images`;
  const response = await fetch(
    reqUrl,
    {
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": 2,
        "trakt-api-key": process.env.TRAKT_CLIENT_ID
      }
    }
  );
  return await response.json();
}
//Function to retrieve a list of studios by IMDB movie ID
async function getStudiosByMovieId(imdbId) {
  const reqUrl = `${trakt}/movies/${imdbId}/studios`;
  const response = await fetch(
    reqUrl,
    {
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": 2,
        "trakt-api-key": process.env.TRAKT_CLIENT_ID
      }
    }
  );
  return await response.json();
}

async function getMostAnticipatedShows() {
  const reqUrl = `${trakt}/shows/anticipated?limit=15`;
  const response = await fetch(
    reqUrl,
    {
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": 2,
        "trakt-api-key": process.env.TRAKT_CLIENT_ID
      }
    }
  );
  return await response.json();
}

async function getShowDetails(showId) {
  const reqUrl = `${trakt}/shows/${showId}?extended=full`;
  const response = await fetch(
    reqUrl,
    {
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": 2,
        "trakt-api-key": process.env.TRAKT_CLIENT_ID
      }
    }
  );
  return await response.json();
}

export default {
  getTrendingMovies,
  getStudiosByMovieId,
  getMostAnticipatedShows,
  getShowDetails
};