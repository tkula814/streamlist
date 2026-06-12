import { useEffect, useState } from "react";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import MovieSearch from "./pages/MovieSearch";
import Subscriptions from "./pages/Subscriptions";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Login from "./pages/Login";
import CreditCard from "./pages/CreditCard";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("streamListUser");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Error loading user from localStorage:", error);
      return null;
    }
  });

  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("streamListCart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  });

  const [warning, setWarning] = useState("");

  useEffect(() => {
    localStorage.setItem("streamListCart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (!warning) return;

    const timer = setTimeout(() => {
      setWarning("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [warning]);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    localStorage.removeItem("streamListUser");
    setUser(null);
    navigate("/login");
  };

  const addToCart = (product) => {
    setWarning("");

    const existingSubscription = cartItems.find(
      (item) => item.type === "subscription"
    );

    if (product.type === "subscription" && existingSubscription) {
      setWarning(
        "Only one subscription can be added at a time. Remove the current subscription before selecting another plan."
      );
      return;
    }

    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === id && item.type === "subscription") {
          return item;
        }

        return item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item;
      })
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems(
      cartItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  if (!user?.isLoggedIn) {
    return (
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="app">
      <nav className="navbar" aria-label="Main navigation">
        <div className="logo">🎬 StreamList</div>

        <ul className="nav-links">
          <li>
            <Link to="/">StreamList</Link>
          </li>
          <li>
            <Link to="/movies">Movies</Link>
          </li>
          <li>
            <Link to="/subscriptions">Subscriptions</Link>
          </li>
          <li>
            <Link to="/cart">Cart ({cartCount})</Link>
          </li>
          <li>
            <Link to="/credit-card">Credit Card</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>

        <button type="button" className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <main className="page-container">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute user={user}>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/movies"
            element={
              <ProtectedRoute user={user}>
                <MovieSearch />
              </ProtectedRoute>
            }
          />

          <Route
            path="/subscriptions"
            element={
              <ProtectedRoute user={user}>
                <Subscriptions addToCart={addToCart} warning={warning} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute user={user}>
                <Cart
                  cartItems={cartItems}
                  removeFromCart={removeFromCart}
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/credit-card"
            element={
              <ProtectedRoute user={user}>
                <CreditCard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/about"
            element={
              <ProtectedRoute user={user}>
                <About />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;