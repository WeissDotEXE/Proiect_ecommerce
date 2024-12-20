import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import DisplayPage from "./pages/DisplayPage";
import AdminPage from "./pages/AdminPage";
import ProductPage from "./pages/ProductPage";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import CartPage from "./pages/CartPage";

function App() {
  useEffect(() => {
    let existingId = localStorage.getItem("random_user_id");
    if (!existingId) {
      const newId = uuidv4();
      localStorage.setItem("random_user_id", newId);
      existingId = newId;
    }
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<DisplayPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
