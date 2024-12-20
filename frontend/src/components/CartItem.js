const CartItem = ({ product, deleteItemHandler }) => {
  return (
    <div
      style={{
        height: "130px",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "gray",
        margin: "10px",
      }}
    >
      <img
        src={product.image}
        style={{ width: "100px", height: "100px", objectFit: "cover" }}
      />
      <p>{product.name}</p>
      <p>{product.price}</p>
      <button onClick={deleteItemHandler}>Delete product</button>
    </div>
  );
};

export default CartItem;
