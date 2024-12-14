import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [activeCategory, setActiveCategory] = useState("all");

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter products by category
  const filterProduct = (category) => {
    setActiveCategory(category);
    setCurrentPage(1); // Reset to first page when filtering
    if (category === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
      {/* Category Navigation */}
      <div className="buttons d-flex justify-content-center mb-5 pb-5">
        <button className={`btn me-2 ${activeCategory === "all" ? "btn-dark" : "btn-outline-dark"}`} onClick={() => filterProduct("all")}>All</button>
        <button className={`btn me-2 ${activeCategory === "men's clothing" ? "btn-dark" : "btn-outline-dark"}`} onClick={() => filterProduct("men's clothing")}>Men's Clothing</button>
        <button className={`btn me-2 ${activeCategory === "women's clothing" ? "btn-dark" : "btn-outline-dark"}`} onClick={() => filterProduct("women's clothing")}>Women's Clothing</button>
        <button className={`btn me-2 ${activeCategory === "jewelery" ? "btn-dark" : "btn-outline-dark"}`} onClick={() => filterProduct("jewelery")}>Jewellery</button>
        <button className={`btn me-2 ${activeCategory === "electronics" ? "btn-dark" : "btn-outline-dark"}`} onClick={() => filterProduct("electronics")}>Electronics</button>
      </div>

      {/* Product Cards */}
      <div className="row">
        {currentItems.map((product) => (
          <div className="col-md-3 mb-4" key={product.id}>
            <div className="card h-100 text-center p-4">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.title}
                height="250px"
                onError={(e) => {
                  e.target.src = `${process.env.PUBLIC_URL}/assets/images/fallback.jpg`; // Fallback image
                }}
              />
              <div className="card-body">
                <h5 className="card-title mb-0">{truncate(product.title, 20)}</h5>
                <p className="card-text lead fw-bold">${product.price}</p>
                <NavLink to={`/products/${product.id}`} className="btn btn-outline-dark">Buy Now</NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <nav>
        <ul className="pagination justify-content-center">
          {[...Array(totalPages).keys()].map((number) => (
            <li key={number + 1} className={`page-item ${currentPage === number + 1 ? "active" : ""}`}>
              <button className="page-link" onClick={() => paginate(number + 1)}>{number + 1}</button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );

  const truncate = (str, length) => (str.length > length ? str.substring(0, length) + "..." : str);

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
