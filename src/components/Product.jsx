import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartSlice"; // Ensure you're importing the correct action
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const Product = () => {
  const { id } = useParams();
  const   
 [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);   


  const dispatch = useDispatch();

  // Function to add product to cart
  const addProduct = (product) => {
    // Ensure to add the quantity while adding to cart
    dispatch(addToCart({ ...product, qty: 1 })); // Assuming addToCart properly handles adding items
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`); // Fetch from API endpoint
        if (!response.ok) {
          throw new Error(`Error fetching product: ${response.statusText}`);
        }
        const product = await response.json();
        setProduct(product);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);


    const Loading = () => (  
        <>
            <div className="col-md-6" style={{lineHeight:2}}>
                <Skeleton height={400} />
            </div>
            <div className="col-md-6">
                <Skeleton height={50} width={300} />
                <Skeleton height={75} />
                <Skeleton height={25} width={150} />
                <Skeleton height={50} />
                <Skeleton height={150} />
                <Skeleton height={50} width={100} />
                <Skeleton height={50} width={100} style={{marginLeft:6}} />
            </div>
        </>  
    );  

    const ShowProduct = () => (
        <>
          <div className="col-md-6">
            <img src={product.image} alt={product.title} height="400px" width="400px" />
          </div>
          <div className="col-md-6">   

<h4>Category: {product.category}</h4>
<h1 className="display-5">{product.title}</h1>
<p className="lead fw-bolder">
  Rating: {product.rating && product.rating.rate}   
<i className="fa fa-star"></i>
</p>
<h3 className="display-6 fw-bold my-4">Ksh   
{product.price}</h3>
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
            {loading ? (
              <Loading />
            ) : product ? (
              <ShowProduct />
            ) : (
              <p>Product not found</p>
            )}
          </div>
        </div>
      );
    };
    
    export default Product;