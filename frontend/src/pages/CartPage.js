import React, { useState, useEffect } from "react";
import axios from "axios";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const nagivate = useNavigate();

  const [productList, setProductList] = useState([]);
  const [buyerName, setBuyerName] = useState("");
  const [adress, setAdress] = useState("");
  const [total, setTotal] = useState(0);

  const userId = localStorage.getItem("random_user_id");
  console.log(userId);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/cart/${userId}`);
        console.log(res);

        setProductList(res.data.productList);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCart();
  }, []);

  const calculateTotal = () => {
    for (let i = 0; i < productList.length; i++) {
      setTotal(total + productList[i].price);
    }
  };

  useEffect(() => {
    if (productList.length) {
      calculateTotal();
    }
  }, [productList]);

  console.log(productList);

  const deleteItemHandler = async () => {};

  const submitOrderHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/orders/add",
        {
          buyerName,
          productList,
          total,
          date: Date.now(),
        }
      );
      if (response.status === 201) {
        const deleteCardResponse = await axios.delete(
          `http://localhost:5000/api/cart/${userId}`
        );
        if (deleteCardResponse.status === 200) {
          nagivate("/");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Your Cart</h2>
      <div>
        {productList.length ? (
          productList.map((item, index) => (
            <CartItem key={index} product={item} />
          ))
        ) : (
          <h2 style={{ textAlign: "center" }}>No productList</h2>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {productList.length > 0 && (
          <div>
            <h2>Billing info</h2>
            <form
              onSubmit={submitOrderHandler}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label>Your Name</label>
              <input
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
              />
              <label>Adress</label>
              <input
                value={adress}
                onChange={(e) => setAdress(e.target.value)}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
