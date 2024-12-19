import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import DisplayPage from "./pages/DisplayPage";
import AdminPage from "./pages/AdminPage";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DisplayPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
