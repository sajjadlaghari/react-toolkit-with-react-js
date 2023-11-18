import React, { useEffect, useState } from "react";
import { add, remove } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "@emotion/react";
import { RingLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Products = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [products, setProducts] = useState([]);
  const [loader, setloader] = useState(false);

  useEffect(() => {
    setloader(true);
    const fetchProducts = async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setProducts(data);
      setloader(false);
    };
    fetchProducts();
  }, []);

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

  if (loader) {
    return (
      <div className="Loaderclass">
        <RingLoader
          color={"#36D7B7"}
          loading={loader}
          css={override}
          size={150}
        />
      </div>
    );
  }
  return (
    <div className="row mt-5">
      {products?.map((product) => (
        <div className="col-lg-3 mb-5" key={product.id}>
          <div className="card" style={{ width: "18rem" }}>
            <img
              src={product.image}
              className="card-img-top p-3"
              alt="..."
              style={{ height: "200px" }}
            />
            <div className="card-body">
              <h5 className="card-title">{product.title.slice(0, 20)}</h5>
              <p className="card-text">{product.description.slice(0, 50)}</p>
              <div className="col-lg-12 text-center">
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
