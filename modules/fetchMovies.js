const API_KEY = "ed5381eb1e1c381406081dd00ed56ac8";

async function getMovies(event) {
  const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&api_key=${API_KEY}`;
  event.preventDefault();
  document.getElementById("error").innerText = "";
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.results && Array.isArray(data.results)) {
      const Top10PopularMovies = data.results.slice(0, 10);
      displayMovies(Top10PopularMovies);
    } else {
      console.error(data);
      document.getElementById("error").innerText = "Invalid search";
      document.getElementById("movieContainer").innerText = "";
    }
  } catch (error) {
    console.error(error);
    document.getElementById("error").innerText = "Error something happened";
  }
}

async function getTopRatedMovies(event) {
  const url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${API_KEY}`;
  event.preventDefault();
  document.getElementById("error").innerText = "";
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.results && Array.isArray(data.results)) {
      const Top10TopRatedMovies = data.results.slice(0, 10);
      displayMovies(Top10TopRatedMovies);
    } else {
      console.error(data);
      document.getElementById("error").innerText = "Invalid search";
    }
  } catch (error) {
    console.error(error);
    document.getElementById("error").innerText = "Error something happened";
  }
}

function displayMovies(movies) {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const container = document.getElementById("moviesContainer");
  container.innerHTML = "";

  for (const movie of movies) {
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");

    const movieImage = document.createElement("img");
    movieImage.src = imageBaseUrl + movie.poster_path;
    movieImage.alt = movie.title;
    movieElement.append(movieImage);

    const movieTitle = document.createElement("h2");
    movieTitle.textContent = movie.title;
    movieElement.append(movieTitle);

    const movieReleaseDate = document.createElement("p");
    movieReleaseDate.textContent = `Release Date: ${movie.release_date}`;
    movieElement.append(movieReleaseDate);

    container.append(movieElement);
  }
}

async function searchMovie(event) {
  event.preventDefault();
  const inputSearchMovie = document.getElementById("inputSearchMovie").value;
  const url = `https://api.themoviedb.org/3/search/movie?query=%20${inputSearchMovie}&api_key=${API_KEY}`;
  document.getElementById("error").innerText = "";

  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    console.log(data);

    if (data.results && data.results.length > 0) {
      displaySearchMovies(data.results);
    } else {
      console.log("No results found.");
      document.getElementById("error").innerText = "Invalid search";
      document.getElementById("moviesContainer").innerHTML = "";
    }
  } else {
    console.error(`${response.status} ${response.statusText}`);
  }
}

//Gather the information from the API and sets the elements to the matching data
function displaySearchMovies(movies) {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const container = document.getElementById("moviesContainer");

  container.innerHTML = "";

  for (const movie of movies) {
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");

    const movieImage = document.createElement("img");
    movieImage.src = imageBaseUrl + movie.poster_path;
    movieImage.alt = movie.title;
    movieElement.append(movieImage);

    const movieTitle = document.createElement("h2");
    movieTitle.textContent = movie.title;
    movieElement.append(movieTitle);

    const movieReleaseDate = document.createElement("p");
    movieReleaseDate.textContent = `Release Date: ${movie.release_date}`;
    movieElement.append(movieReleaseDate);

    const movieSummary = document.createElement("p");
    movieSummary.textContent = `Summary: ` + movie.overview;
    movieElement.append(movieSummary);

    container.append(movieElement);
  }
}

export { getMovies, searchMovie, getTopRatedMovies };
