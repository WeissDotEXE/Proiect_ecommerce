import React, { useState } from "react";
import axios from "axios";

function AdminPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const addProduct = async () => {
    await axios.post("http://localhost:5000/api/products/add", {
      name,
      price,
      image,
    });
    alert("Product Added!");
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <input
        placeholder="Product Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Product Price"
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        placeholder="Image Link"
        onChange={(e) => setImage(e.target.value)}
      />
      <button onClick={addProduct}>Add Product</button>
    </div>
  );
}

export default AdminPage;
