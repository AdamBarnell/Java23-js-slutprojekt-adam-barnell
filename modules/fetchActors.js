const API_KEY = "ed5381eb1e1c381406081dd00ed56ac8";

async function searchActor(event) {
  event.preventDefault();
  const inputSearchActor = document.getElementById("inputSearchActor").value;
  const url = `https://api.themoviedb.org/3/search/person?query=%20${inputSearchActor}&api_key=${API_KEY}`;
  document.getElementById("error").innerText = "";
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    console.log(data);

    if (data.results && data.results.length > 0) {
      displaySearchActors(data.results);
    } else {
      console.log("No results found.");
      document.getElementById("error").innerText = "Invalid search";
    }
  } else {
    console.error(`${response.status} ${response.statusText}`);
    document.getElementById("error").innerText = "Error something happened";
  }
}

function displaySearchActors(actors) {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const container = document.getElementById("moviesContainer");

  container.innerHTML = "";

  for (const actor of actors) {
    const actorElement = document.createElement("div");
    actorElement.classList.add("actor");

    const actorImage = document.createElement("img");
    actorImage.src = imageBaseUrl + actor.profile_path;
    actorImage.alt = actor.title;
    actorElement.append(actorImage);

    const actorName = document.createElement("h2");
    actorName.textContent = actor.original_name;
    actorElement.append(actorName);

    const actorKnownAs = document.createElement("p");
    actorKnownAs.textContent = `Known for: ${actor.known_for_department}`;
    actorElement.append(actorKnownAs);

    const moviesList = document.createElement("div");
    moviesList.classList.add("movies-list");
    for (const movie of actor.known_for) {
      const movieItem = document.createElement("div");
      movieItem.classList.add("movie-item");

      const moviePoster = document.createElement("img");
      moviePoster.src = imageBaseUrl + movie.poster_path;
      moviePoster.alt = movie.title;
      moviePoster.classList.add("movie-poster");
      movieItem.appendChild(moviePoster);

      const movieInfo = document.createElement("div");
      movieInfo.classList.add("movie-info");
      //Controls if data that is collected is a movie or a series
      const movieTitle = document.createElement("h3");
      if (movie.media_type === "movie") {
        movieTitle.textContent = `${movie.title} (${movie.release_date})`;
      } else if (movie.media_type === "tv") {
        movieTitle.textContent = `${movie.original_name} (${movie.first_air_date})`;
      }
      movieInfo.appendChild(movieTitle);

      const mediaType = document.createElement("p");
      mediaType.textContent = `Movie or Series: ${movie.media_type}`;
      movieInfo.appendChild(mediaType);

      const movieOverview = document.createElement("p");
      movieOverview.textContent = movie.overview;
      movieOverview.classList.add("movie-overview");
      movieInfo.appendChild(movieOverview);

      movieItem.appendChild(movieInfo);
      moviesList.appendChild(movieItem);
    }
    actorElement.appendChild(moviesList);

    container.append(actorElement);
  }
}

export { searchActor };
