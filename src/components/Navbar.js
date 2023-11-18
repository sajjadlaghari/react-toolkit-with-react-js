import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const items = useSelector((state) => state.cart);

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light p-3">
      <div class="container-fluid">
        <Link class="navbar-brand" to="/">
          Logo Here
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link class="nav-link active" to="/" aria-current="page">
                Home
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/cart">
                Cart
              </Link>
            </li>
          </ul>
          <form class="d-flex">
            <Link class="nav-link" style={{ color: "#000" }}>
              Cart Items: {items.length}
            </Link>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
