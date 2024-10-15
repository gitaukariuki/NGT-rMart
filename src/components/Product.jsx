import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action/index"; // Ensure the path is correct
import { incrementQuantity, decrementQuantity, removeItem } from '../redux/reducer/handleCart';
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.PUBLIC_URL}/data/products.json`);
        if (!response.ok) {
          throw new Error(`Error fetching products: ${response.statusText}`);
        }
        const products = await response.json();
        const foundProduct = products.find((item) => item.id === parseInt(id, 10));
        setProduct(foundProduct || null);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  const Loading = () => (
    <>
      <Skeleton height={400} />
      <Skeleton height={50} width={300} />
    </>
  );

  const ShowProduct = () => (
    <>
      <div className="col-md-6">
        <img src={product.image} alt={product.title} height="400px" width="400px" />
      </div>
      <div className="col-md-6">
        <h4 className="text-uppercase text-black-50">{product.category}</h4>
        <h1 className="display-5">{product.title}</h1>
        <p className="lead fw-bolder">
          Rating: {product.rating && product.rating.rate}
          <i className="fa fa-star"></i>
        </p>
        <h3 className="display-6 fw-bold my-4">Ksh {product.price}</h3>
        <p className="lead">{product.description}</p>
        <button className="btn btn-outline-dark px-4 py-2" onClick={() => addProduct(product)}>
          Add to Cart
        </button>
        <NavLink to="/cart" className="btn btn-dark ms-2 px-3 py-2">
          Go to Cart
        </NavLink>
      </div>
    </>
  );

  return (
    <div className="container py-5">
      <div className="row py-4">
        {loading ? <Loading /> : product ? <ShowProduct /> : <p>Product not found</p>}
      </div>
    </div>
  );
};

export default Product;
