import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div style={styles.card}>
      <img src={product.image} alt={product.name} style={styles.image} />
      <div style={styles.info}>
        <h3 style={styles.title}>{product.name}</h3>
        <p style={styles.price}>${product.price}</p>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    width: "250px",
    textAlign: "center",
    margin: "10px",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
  },
  info: {
    padding: "10px",
  },
  title: {
    fontSize: "1.2em",
    margin: "10px 0",
    color: "#333",
  },
  price: {
    fontSize: "1.1em",
    color: "#007bff",
    fontWeight: "bold",
  },
};

export default ProductCard;
