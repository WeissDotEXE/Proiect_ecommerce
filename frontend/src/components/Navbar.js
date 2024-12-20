import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        height: "50px",
        width: "100%",
        backgroundColor: "black",
        color: "white",
      }}
    >
      <Link to={"/"}>
        <h1>Proiect Ecommerce</h1>
      </Link>
      <Link to={"/cart"}>Cart</Link>
    </div>
  );
};

export default Navbar;
