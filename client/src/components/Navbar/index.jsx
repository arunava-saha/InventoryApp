import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Navbar = () => {
  return (
    <div
      className={styles.navbar}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span className="logo">Inventory.in</span>
      <div style={{ margin: "0 20px" }}>
        <Link className="navLink" to="/products">
          Home
        </Link>
        <Link className="navLink" to="/">
          Admin
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
