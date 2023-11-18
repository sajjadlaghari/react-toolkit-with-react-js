import React, { useEffect, useState } from "react";
import { add, remove } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "@emotion/react";
import { RingLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import fetchProducts from "./FetchProducts";
import { Link } from "react-router-dom";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Products = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const {
    isLoading,
    error,
    data: products,
  } = useQuery({ queryKey: ["products"], queryFn: fetchProducts });

  const handleAddToCart = (product) => {
    dispatch(add(product));

    const addedProduct = cart.find(
      (item) => item.id === product.id && item.added
    );
    if (addedProduct) {
      toast.warning("Product is already in the cart!");
    } else {
      toast.success("Product added to the cart!");
    }
  };
  const handleRemoveFromCart = (productId) => {
    dispatch(remove(productId));
    toast.warning("Product removed from the cart!");
  };

  const isProductInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  if (isLoading) {
    return (
      <div className="Loaderclass">
        <RingLoader
          color={"#36D7B7"}
          loading={isLoading}
          css={override}
          size={150}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <h4>{error.message}</h4>
      </div>
    );
  }
  return (
    <div className="row mt-5">
      {products?.map((product) => (
        <div className="col-lg-3 mb-5" key={product.id}>
          <div className="card" style={{ width: "18rem" }}>
            <Link
              to={`/productDetailed/${product.id}`}
              style={{ color: "#000", textDecoration: "none" }}
            >
              <img
                src={product.thumbnail}
                className="card-img-top p-3"
                alt="..."
                style={{ height: "200px" }}
              />
            </Link>

            <div className="card-body">
              <Link
                to={`/productDetailed/${product.id}`}
                style={{ color: "#000", textDecoration: "none" }}
              >
                <h5 className="card-title">{product.title.slice(0, 20)}</h5>
                <p className="card-text">{product.description.slice(0, 50)}</p>
              </Link>

              <div className="col-lg-12 text-center mt-3">
                {isProductInCart(product.id) ? (
                  <a
                    className="btn btn-danger alignself-center"
                    onClick={() => handleRemoveFromCart(product.id)}
                  >
                    Remove
                  </a>
                ) : (
                  <a
                    className="btn btn-success alignself-center"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add To Cart
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      <ToastContainer />
    </div>
  );
};

export default Products;
