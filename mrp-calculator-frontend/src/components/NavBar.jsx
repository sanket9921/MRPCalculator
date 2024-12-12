import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav style={{ padding: "10px", backgroundColor: "#333", color: "#fff" }}>
      <ul style={{ listStyle: "none", display: "flex", gap: "15px", margin: 0 }}>
        <li>
          <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/AddProduct" style={{ textDecoration: "none", color: "#fff" }}>
            Add Product
          </Link>
        </li>
        <li>
          <Link to="/AddInventory" style={{ textDecoration: "none", color: "#fff" }}>
            Add Inventory
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
