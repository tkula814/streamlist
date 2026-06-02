import { useState } from "react";

function MovieSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const imageBaseUrl = "https://image.tmdb.org/t/p/w300";

  const searchMovies = async (event) => {
    event.preventDefault();

    if (!searchTerm.trim()) {
      setError("Please enter a movie title.");
      return;
    }

    if (!apiKey) {
      setError("TMDB API key is missing. Check your .env file.");
      return;
    }

    try {
      setError("");

      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
          searchTerm
        )}`
      );

      if (!response.ok) {
        throw new Error("Unable to retrieve movie data.");
      }

      const data = await response.json();
      setMovies(data.results || []);
    } catch (err) {
      setError("There was a problem connecting to the TMDB API.");
      setMovies([]);
    }
  };

  return (
    <main className="page movie-page">
      <h1>Movie Search</h1>
      <p>Search for movie information using the TMDB API.</p>

      <form className="movie-form" onSubmit={searchMovies}>
        <input
          type="text"
          placeholder="Enter a movie title"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <section className="movie-results">
        {movies.map((movie) => (
          <article className="movie-card" key={movie.id}>
            {movie.poster_path ? (
              <img
                src={`${imageBaseUrl}${movie.poster_path}`}
                alt={movie.title}
              />
            ) : (
              <div className="no-poster">No Poster Available</div>
            )}

            <h2>{movie.title}</h2>

            <p>
              <strong>Release Date:</strong>{" "}
              {movie.release_date || "Not available"}
            </p>

            <p>
              <strong>Rating:</strong>{" "}
              {movie.vote_average ? movie.vote_average : "Not rated"}
            </p>

            <p>{movie.overview || "No overview available."}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

export default MovieSearch;