import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

const Products = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState(data);

    useEffect(() => {
        // Mocked data
        const mockData = [
            {
                id: 1,
                title: 'Product 1',
                price: '2950.99',
                category: 'accessories',
                image: '/assets/images/accessories.jpg'
            },
            {
                id: 2,
                title: 'Product 2',
                price: '3599.99',
                category: 'electronics',
                image: '/assets/images/electronics.jpg'
            },
            {
                id: 3,
                title: 'Product 3',
                price: '1500',
                category: 'households',
                image: '/assets/images/households.jpg'
            },
            {
                id: 4,
                title: 'Product 4',
                price: '1500',
                category: 'clothing',
                image: '/assets/images/clothing.jpg'
            },
            {
                id: 5,
                title: 'Product 5',
                price: '1500',
                category: 'electronics',
                image: '/assets/images/imprimante1.png'
            },
            {
                id: 6,
                title: 'Product 6',
                price: '1500',
                category: 'electronics',
                image: '/assets/images/imprimante2.png'
            },
            {
                id: 7,
                title: 'Product 7',
                price: '1500',
                category: 'electronics',
                image: '/assets/images/imprimante3.png'
            },
            {
                id: 8,
                title: 'Product 8',
                price: '1500',
                category: 'electronics',
                image: '/assets/images/imprimante4.png'
            },
            {
                id: 9,
                title: 'Product 9',
                price: '1500',
                category: 'electronics',
                image: '/assets/images/imprimante5.png'
            },
            {
                id: 10,
                title: 'Product 10',
                price: '1500',
                category: 'electronics',
                image: '/assets/images/imprimante6.png'
            },
            {
                id: 11,
                title: 'Product 11',
                price: '1500',
                category: 'electronics',
                image: '/assets/images/imprimante7.png'
            },
            {
                id: 12,
                title: 'Product 12',
                price: '1500',
                category: 'electronics',
                image: '/assets/images/imprimante8.png'
            },
            {
                id: 13,
                title: 'Product 13',
                price: '1500',
                category: 'electronics',
                image: '/assets/images/imprimante9.png'
            },
            {
                id: 14,
                title: 'Product 14',
                price: '1500',
                category: 'electronics',
                image: '/assets/images/bac1.png'
            },
            {
                id: 15,
                title: 'Product 15',
                price: '1500',
                category: 'electronics',
                image: '/assets/images/e1.jpg'
            }, 
            {
                id: 16,
                title: 'Product 16',
                price: '1500',
                category: 'men\'s clothing',
                image: '/assets/images/f145.jpg'
            }, 
            {
                id: 17,
                title: 'Product 17',
                price: '1500',
                category: 'men\'s clothing',
                image: '/assets/images/f144.jpg'
            }, 
            {
                id: 18,
                title: 'Product 18',
                price: '1500',
                category: 'men\'s clothing',
                image: '/assets/images/f143.jpg'
            }, 
            {
                id: 19,
                title: 'Product 19',
                price: '1500',
                category: 'men\'s clothing',
                image: '/assets/images/f142.jpg'
            }, 
            {
                id: 20,
                title: 'Product 20',
                price: '1500',
                category: 'men\'s clothing',
                image: '/assets/images/f160.jpg'
            }, 
            {
                id: 21,
                title: 'Product 21',
                price: '1500',
                category: 'men\'s clothing',
                image: '/assets/images/f141.jpg'
            }, 
            {
                id: 22,
                title: 'Product 22',
                price: '1500',
                category: 'men\'s clothing',
                image: '/assets/images/f140.jpg'
            }, 
            {
                id: 23,
                title: 'Product 23',
                price: '1500',
                category: 'men\'s clothing',
                image: '/assets/images/f139.jpg'
            }, 
            {
                id: 24,
                title: 'Product 24',
                price: '1500',
                category: 'men\'s clothing',
                image: '/assets/images/f138.jpg'
            }, 
            {
                id: 25,
                title: 'Product 25',
                price: '1500',
                category: 'women\'s clothing',
                image: '/assets/images/f146.jpg'
            }, 
            {
                id: 26,
                title: 'Product 26',
                price: '1500',
                category: 'women\'s clothing',
                image: '/assets/images/f147.jpg'
            }, 
            {
                id: 27,
                title: 'Product 27',
                price: '1500',
                category: 'women\'s clothing',
                image: '/assets/images/f148.jpg'
            }, 
            {
                id: 28,
                title: 'Product 28',
                price: '1500',
                category: 'women\'s clothing',
                image: '/assets/images/f104.jpg'
            }, 
            {
                id: 29,
                title: 'Product 29',
                price: '1500',
                category: 'women\'s clothing',
                image: '/assets/images/f102.jpg'
            }, 
            {
                id: 30,
                title: 'Product 30',
                price: '1500',
                category: 'women\'s clothing',
                image: '/assets/images/f151.jpg'
            }, 
            {
                id: 31,
                title: 'Product 31',
                price: '1500',
                category: 'women\'s clothing',
                image: '/assets/images/f114.jpg'
            }, 
            {
                id: 32,
                title: 'Product 32',
                price: '1500',
                category: 'women\'s clothing',
                image: '/assets/images/f86.jpg'
            },
            {
                id: 33,
                title: 'Product 33',
                price: '1500',
                category: 'women\'s clothing',
                image: '/assets/images/f59.jpg'
            }, 
            {
                id: 34,
                title: 'Product 34',
                price: '1500',
                category: 'women\'s clothing',
                image: '/assets/images/f154.jpg'
            },
            // Add more products as needed
        ];

        setLoading(true);
        setTimeout(() => {
            setData(mockData);
            setFilter(mockData); // Ensure filter is initialized with the mock data
            setLoading(false);
        }, 1000); // Simulate async loading
    }, []);

    const Loading = () => (
        <>
            <div className="col-md-3"><Skeleton height={350}/></div>
            <div className="col-md-3"><Skeleton height={350}/></div>
            <div className="col-md-3"><Skeleton height={350}/></div>
            <div className="col-md-3"><Skeleton height={350}/></div>
        </>
    );

    const filterProduct = (cat) => {
        const updatedList = data.filter((x) => x.category === cat);
        setFilter(updatedList);
    }

    const ShowProducts = () => {
        return (
            <>
                <div className="buttons d-flex justify-content-center mb-5 pb-5">
                    <button className="btn btn-outline-dark me-2" onClick={() => setFilter(data)}>All</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("men's clothing")}>Men's Clothing</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("women's clothing")}>Women's Clothing</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("kid's clothing")}>Kid's Clothing</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("electronics")}>Electronics</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("kitchenware")}>Kitchenware</button>
                </div>

                <div className="row">
                    {filter.map((product) => (
                        <div className="col-md-3 mb-4" key={product.id}>
                            <div className="card h-100 text-center p-4">
                                <img src={process.env.PUBLIC_URL + product.image} className="card-img-top" alt={product.title} height="250px" />
                                <div className="card-body">
                                    <h5 className="card-title mb-0">{product.title.substring(0, 12)}...</h5>
                                    <p className="card-text lead fw-bold">Ksh {product.price}</p>
                                    <NavLink to={`/products/${product.id}`} className="btn btn-outline-dark">Buy Now</NavLink>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        );
    };

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
