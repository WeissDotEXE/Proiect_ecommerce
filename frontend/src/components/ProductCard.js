import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, isAdmin }) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const editProduct = async () => {
    return await axios.post("http://localhost:5000/api/products/add", {
      name,
      price,
      image,
    });
  };

  const deleteProduct = async () => {
    return await axios.delete(
      `http://localhost:5000/api/products/${product._id}`
    );
  };

  const updateHandler = async () => {
    const response = await editProduct();
    if (response.status === 200) {
      setShowEditModal(false);
    }
  };

  const deleteHandler = async () => {
    const response = await deleteProduct();
    if (response.status === 200) {
      setShowDeleteModal(false);
    }
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setDescription(product.description);
    }
  }, [product]);

  return (
    <div
      style={styles.card}
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <img src={product.image} alt={product.name} style={styles.image} />
      <div style={styles.info}>
        <h3 style={styles.title}>{product.name}</h3>
        <p style={styles.price}>${product.price}</p>
      </div>
      {isAdmin && (
        <div style={styles.adminButtons}>
          <button onClick={() => setShowEditModal(true)}>Edit</button>
          <button onClick={() => setShowDeleteModal(true)}>Delete</button>
        </div>
      )}
      <Modal isOpen={showEditModal}>
        <h2>Edit {product.name}</h2>
        <button onClick={() => setShowEditModal(false)}>close</button>
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
        <button onClick={updateHandler}>Update</button>
      </Modal>
      <Modal isOpen={showDeleteModal}>
        <p>Are you sure you want to delete {product.name}?</p>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <button onClick={deleteHandler}>Yes</button>
          <button onClick={() => setShowDeleteModal(false)}>No</button>
        </div>
      </Modal>
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
    cursor: "pointer",
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
  adminButtons: {
    display: "flex",
    justifyContent: "space-around",
    padding: "10px 0px",
  },
};

export default ProductCard;
