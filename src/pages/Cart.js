import { useState, useEffect } from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { remove } from "../store/cartSlice";


const Cart = () => {
    
    const products = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    // const [loader, setloader] = useState(false)


    const handleRemove = (productId) => {
        dispatch(remove(productId))
    }

  

    return (
        <div className="container">
            <h1 className="text-center pt-4">Carts</h1>
            <div className="row mt-5">
        {
            products?.map(product => (
                <div className="col-lg-3 mb-5" key={product.id}>
                <div class="card" style={{ width: '18rem' }}>
                    <img src={product.image} class="card-img-top p-3" alt="..."  style={{height:'200px'}} />
                    <div class="card-body">
                        <h5 class="card-title">{product.title.slice(0, 20)}</h5>
                        <p class="card-text">{product.description.slice(0, 50)}</p>
                        <div className="col-lg-12 text-center">
                        <a  href="#" class="btn btn-danger alignself-center" onClick={() =>handleRemove(product.id)}>Remove</a>

                        </div>
                    </div>
                </div>
            </div>
            ))
        }
    </div>
        </div>
    )
}

export default Cart
