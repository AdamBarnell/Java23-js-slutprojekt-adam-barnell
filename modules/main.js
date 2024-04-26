import { getMovies, searchMovie, getTopRatedMovies } from "./fetchMovies.js";
import { searchActor } from "./fetchActors.js";
import { checkGuess, guessingGame } from "./guessingGame.js";

//Make sure the right path loads the right functions. So it does not interfere with eachother.
const pathname = window.location.pathname;

if (pathname.includes("/movie.html")) {
  setupMoviePage();
} else if (pathname.includes("/actor.html")) {
  setupActorPage();
} else if (pathname.includes("/guessingGame.html")) {
  setupGuessingGamePage();
}
// the setups for everypage, sets the listeners.
function setupMoviePage() {
  const fetchMoviesButton = document.getElementById("fetchMoviesButton");
  if (fetchMoviesButton) {
    fetchMoviesButton.addEventListener("click", getMovies);
  }

  const fetchTopRatedMovies = document.getElementById("fetchTopRatedMovies");
  if (fetchTopRatedMovies) {
    fetchTopRatedMovies.addEventListener("click", getTopRatedMovies);
  }

  const fetchMovieFromSearch = document.getElementById("searchFormMovie");
  if (fetchMovieFromSearch) {
    fetchMovieFromSearch.addEventListener("submit", searchMovie);
  }
}

function setupActorPage() {
  const fetchActorFromSearch = document.getElementById("searchFormActor");
  if (fetchActorFromSearch) {
    fetchActorFromSearch.addEventListener("submit", searchActor);
  }
}
function setupGuessingGamePage() {
  guessingGame();

  const guessForm = document.getElementById("guessForm");
  if (guessForm) {
    guessForm.addEventListener("submit", function (event) {
      event.preventDefault();
      checkGuess(event);
    });
  }
}
