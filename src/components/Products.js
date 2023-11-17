import React, { useEffect, useState } from "react";
import { add } from "../store/cartSlice";
import { useDispatch } from "react-redux";
const Products = () => {


    const dispatch = useDispatch();

    const [products, setProducts] = useState([])
    const [loader, setloader] = useState(false)


    useEffect(() => {
        setloader(true)
        const fetchProducts = async () => {
            const res = await fetch('https://fakestoreapi.com/products');
            const data = await res.json();
            setProducts(data);
            setloader(false)
        }
        fetchProducts()
    }, [])

    const handleAdd = (product) => {

        dispatch(add(product))
    }


    if(loader)
    {
        return (
            <div className="Loaderclass">Loading...</div>
        )
    }
    return <div className="row mt-5">
        {
            products?.map(product => (
                <div className="col-lg-3 mb-5" key={product.id}>
                <div class="card" style={{ width: '18rem' }}>
                    <img src={product.image} class="card-img-top p-3" alt="..."  style={{height:'200px'}} />
                    <div class="card-body">
                        <h5 class="card-title">{product.title.slice(0, 20)}</h5>
                        <p class="card-text">{product.description.slice(0, 50)}</p>
                        <div className="col-lg-12 text-center">
                        <a   class="btn btn-success alignself-center" onClick={() =>handleAdd(product)}>Add To Cart</a>

                        </div>
                    </div>
                </div>
            </div>
            ))
        }
    </div>

}

export default Products