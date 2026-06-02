import { useState } from "react";
import { Search, Star } from "lucide-react";

function Movies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [message, setMessage] = useState("Search for a movie to see TMDB results.");

  const searchMovies = async (event) => {
    event.preventDefault();

    if (!searchTerm.trim()) {
      setMessage("Please enter a movie title.");
      return;
    }

    const token = import.meta.env.VITE_TMDB_TOKEN;

    if (!token) {
      setMessage("TMDB token is missing. Check your .env file.");
      return;
    }

    try {
      setMessage("Searching TMDB...");

      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          searchTerm
        )}&include_adult=false&language=en-US&page=1`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Unable to retrieve movie data from TMDB.");
      }

      const data = await response.json();
      setMovies(data.results || []);

      if (!data.results || data.results.length === 0) {
        setMessage("No movies found. Try another search.");
      } else {
        setMessage(`Showing results for "${searchTerm}".`);
      }
    } catch (error) {
      console.error(error);
      setMessage("There was a problem connecting to TMDB.");
    }
  };

  return (
    <section className="content-card movie-page">
      <h1>Movie Search</h1>
      <p>
        Search the TMDB database to review movie titles, release dates, ratings,
        and descriptions.
      </p>

      <form onSubmit={searchMovies} className="movie-search-form">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <button type="submit">
          <Search size={18} />
          Search
        </button>
      </form>

      <p className="movie-message">{message}</p>

      <div className="movie-grid">
        {movies.map((movie) => (
          <article key={movie.id} className="movie-card">
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                alt={movie.title}
              />
            ) : (
              <div className="poster-placeholder">No Image</div>
            )}

            <div className="movie-card-body">
              <h2>{movie.title}</h2>

              <p className="movie-meta">
                {movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}
                {" | "}
                <Star size={14} />
                {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
              </p>

              <p className="movie-overview">
                {movie.overview
                  ? movie.overview
                  : "No description is available for this title."}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Movies;
