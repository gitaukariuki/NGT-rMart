import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

const Products = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");
      const products = await response.json();
      setData(products);
      setFilter(products);
      setLoading(false);
    };
    getProducts();
  }, []);

  const filterProduct = (cat) => {
    const updatedList = data.filter((x) => x.category === cat);
    setFilter(updatedList);
  };

  const Loading = () => (
    <>
      <div className="col-md-3"><Skeleton height={350} /></div>
      <div className="col-md-3"><Skeleton height={350} /></div>
      <div className="col-md-3"><Skeleton height={350} /></div>
      <div className="col-md-3"><Skeleton height={350} /></div>
    </>
  );

  const ShowProducts = () => (
    <>
      {/* Navigation buttons for categories */}
      <div className="buttons d-flex justify-content-center mb-5 pb-5">
        <button className="btn btn-outline-dark me-2" onClick={() => setFilter(data)}>All</button>
        <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("men's clothing")}>Men's Clothing</button>
        <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("women's clothing")}>Women's Clothing</button>
        <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("jewelery")}>Jewellery</button>
        <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("kitchenware")}>Kitchenware</button>
        <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("electronics")}>Electronics</button>
      </div>

      {/* Product cards */}
      <div className="row">
        {filter.map((product) => (
          <div className="col-md-3 mb-4" key={product.id}>
            <div className="card h-100 text-center p-4">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.title}
                height="250px"
                onError={(e) => {
                  e.target.src = `${process.env.PUBLIC_URL}/assets/images/e10.jpg`;
                }}
              />
              <div className="card-body">
                <h5 className="card-title mb-0">{product.title.substring(0, 12)}...</h5>
                <p className="card-text mb-2">
                  {product.description ? product.description.substring(0, 30) + "..." : "No description available"}
                </p>
                <p className="card-text lead fw-bold">Ksh {product.price}</p>
                <NavLink exact to={`/products/${product.id}`} className="btn btn-outline-dark">Buy Now</NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center">Latest Products</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  );
};

export default Products;
