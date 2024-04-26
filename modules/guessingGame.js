const API_KEY = "ed5381eb1e1c381406081dd00ed56ac8";

async function guessingGameApi() {
  const url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&api_key=${API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();
  const fetchMovies = data.results;
  const randomMovie = Math.ceil(Math.random(fetchMovies) * fetchMovies.length);
  const selectedMovie = fetchMovies[randomMovie];

  console.log(selectedMovie);
  return selectedMovie;
}
//fetches the summary and the original titel. This is used in main.js in setup
async function guessingGame() {
  const selectedMovie = await guessingGameApi();
  if (!selectedMovie) return;

  document.getElementById("movieDescription").textContent =
    selectedMovie.overview;
  document.getElementById("gameArea").dataset.original_title =
    selectedMovie.original_title.toLowerCase();
}

function checkGuess(event) {
  const userTitleGuess = document
    .getElementById("movieTitleGuess")
    .value.toLowerCase();
  const correctTitle =
    document.getElementById("gameArea").dataset.original_title;
  const resultElement = document.getElementById("gameResult");

  if (userTitleGuess === correctTitle) {
    resultElement.textContent = "Congratulations! Your guess is correct!";
    resultElement.style.color = "green";
  } else {
    resultElement.textContent = "Incorrect. Try again!";
    resultElement.style.color = "red";
    console.log("User Guess:", userTitleGuess, "Correct Title:", correctTitle);
  }
}

export { guessingGame, guessingGameApi, checkGuess };
