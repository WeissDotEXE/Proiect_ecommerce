import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

function DisplayPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  return (
    <div style={styles.page}>
      <h2 style={styles.header}>Products</h2>
      <div style={styles.grid}>
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "20px",
    textAlign: "center",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)", // 3 items per row
    gap: "20px", // Space between items
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#333",
  },
};

export default DisplayPage;
