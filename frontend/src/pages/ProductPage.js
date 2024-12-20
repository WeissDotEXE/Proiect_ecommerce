import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductPage = () => {
  const { id } = useParams();

  const [product, setProduct] = useState({});
  console.log(product);

  const buyHandler = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/cart/add", {
        userId: localStorage.getItem("random_user_id"),
        product: {
          name: product.name,
          price: product.price,
          image: product.image,
        },
      });
      if (response.status === 200) {
        alert(`${product.name} added to cart`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get(`http://localhost:5000/api/products/${id}`);
      setProduct(res.data);
    };
    fetchProducts();
  }, []);

  return (
    <div
      style={{
        marginTop: "30px",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <img
          src={product.image}
          style={{
            width: "400px",
            height: "300px",
            objectFit: "cover",
            marginRight: "20px",
          }}
        />
        <div>
          <h2>{product.name}</h2>
          <h2>${product.price}</h2>
          <button style={{ width: "100%" }} onClick={buyHandler}>
            Buy
          </button>
        </div>
      </div>
      <p>{product.description}</p>
    </div>
  );
};

export default ProductPage;
