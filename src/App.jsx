import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import MovieSearch from "./pages/MovieSearch";
import Cart from "./pages/Cart";
import About from "./pages/About";
import "./App.css";

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">🎬 StreamList</div>

        <ul className="nav-links">
          <li>
            <Link to="/">StreamList</Link>
          </li>
          <li>
            <Link to="/movies">Movies</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>

      <main className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MovieSearch />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;