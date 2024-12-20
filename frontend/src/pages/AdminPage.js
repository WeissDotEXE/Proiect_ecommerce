import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Modal from "react-modal";

function AdminPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [products, setProducts] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [error, setError] = useState("");
  const [orders, setOrders] = useState([]);

  const addProduct = async () => {
    return await axios.post("http://localhost:5000/api/products/add", {
      name,
      price,
      image,
      description,
    });
  };

  const addProductHandler = async () => {
    const response = await addProduct();
    if (response.status === 200) {
      setShowAddProduct(false);
    } else {
      setError(response.message);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get("http://localhost:5000/api/orders");
      setOrders(res.data);
    };
    fetchOrders();
  }, []);
  console.log(orders);

  return (
    <div>
      <h2>Admin Panel</h2>
      <h2>Products list</h2>
      <button onClick={() => setShowAddProduct(true)}>Add Product</button>
      <div style={styles.grid}>
        {products.map((p) => (
          <ProductCard key={p._id} product={p} isAdmin={true} />
        ))}
      </div>

      <h2>Orders</h2>
      <div>
        {orders.map((order, index) => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "gray",
              margin: "10px",
            }}
            key={index}
          >
            <p>{order.buyerName}</p>
            <p>
              {order.productList.map((item) => (
                <p>{item}</p>
              ))}
            </p>
            <p>total: ${order.total}</p>
            <p>Date: ${order.date}</p>
          </div>
        ))}
      </div>

      <Modal isOpen={showAddProduct}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Add Product</h2>
          <button onClick={() => setShowAddProduct(false)}>X</button>
        </div>
        <input
          placeholder="Product Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Product Price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          placeholder="Product Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          placeholder="Image Link"
          onChange={(e) => setImage(e.target.value)}
        />
        <button onClick={addProductHandler}>Add Product</button>
        <p style={{ color: "red" }}>{error}</p>
      </Modal>
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
};

export default AdminPage;
