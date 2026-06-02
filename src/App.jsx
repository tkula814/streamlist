import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import MovieSearch from "./pages/MovieSearch";
import SavedEvents from "./pages/SavedEvents";

function App() {
  return (
    <>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/events">Saved Events</Link>
        <Link to="/movies">Movie Search</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<SavedEvents />} />
        <Route path="/movies" element={<MovieSearch />} />
      </Routes>
    </>
  );
}

export default App;

