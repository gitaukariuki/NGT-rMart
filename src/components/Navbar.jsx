import React, { useState } from "react";  
import { NavLink } from "react-router-dom";  
import { useSelector } from "react-redux";  
import CartButton from "./CartButton";

const Navbar = () => {  
    const cartItems = useSelector((state) => state.cart.items); // Adjust this line to select cart items  
    const totalItemsInCart = cartItems.reduce((total, item) => total + item.qty, 0); // Calculate total quantity  
    const [isMenuOpen, setIsMenuOpen] = useState(false);  

    const toggleMenu = () => {  
        setIsMenuOpen(!isMenuOpen);  
    };  

    return (  
        <nav className="navbar navbar-expand-lg bg-white navbar-light py-3 shadow-sm">  
            <div className="container">  
                <NavLink className="navbar-brand fw-bold fs-2" to="/">  
                    NGT eMart  
                </NavLink>  
                <button  
                    className={`navbar-toggler ${isMenuOpen ? '' : 'collapsed'}`}  
                    type="button"  
                    onClick={toggleMenu}  
                    aria-controls="navbarSupportedContent"  
                    aria-expanded={isMenuOpen}  
                    aria-label="Toggle navigation"  
                >  
                    <span className="navbar-toggler-icon"></span>  
                </button>  
                <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarSupportedContent">  
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">  
                        <li className="nav-item">  
                            <NavLink className="nav-link" exact to="/">  
                                Home  
                            </NavLink>  
                        </li>  
                        <li className="nav-item">  
                            <NavLink className="nav-link" to="/products">  
                                Products  
                            </NavLink>  
                        </li>  
                        <li className="nav-item">  
                            <NavLink className="nav-link" to="/about">  
                                About  
                            </NavLink>  
                        </li>  
                        <li className="nav-item">  
                            <NavLink className="nav-link" to="/contacts">  
                                Contacts  
                            </NavLink>  
                        </li>  
                    </ul>  
                    <div className="buttons d-flex align-items-center">  
                        <NavLink to="/login" className="btn btn-outline-dark me-2">  
                            <i className="fa fa-sign-in me-1"></i> Login  
                        </NavLink>  
                        <NavLink to="/register" className="btn btn-outline-dark me-2">  
                            <i className="fa fa-user-plus me-1"></i> Register  
                        </NavLink>  
                        <NavLink to="/cart" className="btn btn-outline-dark">  
                            <i className="fa fa-shopping-cart me-1"></i> Cart ({totalItemsInCart})  
                        </NavLink>  
                    </div>  
                </div>  
            </div>  
        </nav>  
    );  
}  

export default Navbar;