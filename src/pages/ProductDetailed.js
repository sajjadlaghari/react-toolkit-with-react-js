import React from "react";
import { useQuery, useQueryErrorResetBoundary } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { add, remove } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { css } from "@emotion/react";
import { RingLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const ProductDetailed = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const params = useParams();

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
  //   useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/${params.id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();

      return result;
    } catch (error) {
    } finally {
    }
  };

  const {
    isLoading,
    error,
    data: product,
  } = useQuery({ queryKey: ["product", params.id], queryFn: fetchData });

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
    <div className="container my-5">
      <h1 className="text-center mb-5">Product Detailed</h1>
      <div className="row">
        <div className="col-md-5">
          <div className="main-img">
            <img className="img-fluid" src={product.thumbnail} alt="ProductS" />
            {/* <div className="row my-3 previews">
              <div className="col-md-3">
                <img
                  className="w-100"
                  src="https://cdn.pixabay.com/photo/2015/07/24/18/40/model-858754_960_720.jpg"
                  alt="Sale"
                />
              </div>
              <div className="col-md-3">
                <img
                  className="w-100"
                  src="https://cdn.pixabay.com/photo/2015/07/24/18/38/model-858749_960_720.jpg"
                  alt="Sale"
                />
              </div>
              <div className="col-md-3">
                <img
                  className="w-100"
                  src="https://cdn.pixabay.com/photo/2015/07/24/18/39/model-858751_960_720.jpg"
                  alt="Sale"
                />
              </div>
              <div className="col-md-3">
                <img
                  className="w-100"
                  src="https://cdn.pixabay.com/photo/2015/07/24/18/37/model-858748_960_720.jpg"
                  alt="Sale"
                />
              </div>
            </div> */}
          </div>
        </div>
        <div className="col-md-7">
          <div className="main-description px-2">
            <div className="category text-bold">
              Category: {product.category}
            </div>
            <div className="product-title text-bold my-3">{product.title}</div>

            <div className="price-area my-4">
              <p className="old-price mb-1">
                <del>{product.price + 20}</del>{" "}
                <span className="old-price-discount text-danger">
                  (20% off)
                </span>
              </p>
              <p className="new-price text-bold mb-1">{product.price}</p>
            </div>

            <div className="buttons d-flex my-5">
              <div className="block">
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

              <div className="block quantity">
                <input
                  type="number"
                  className="form-control"
                  id="cart_quantity"
                  value="1"
                  min="0"
                  max="5"
                  placeholder="Enter email"
                  name="cart_quantity"
                />
              </div>
            </div>
          </div>

          <div className="product-details my-4">
            <p className="details-title text-color mb-1">Product Details</p>
            <p className="description">{product.description} </p>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ProductDetailed;
