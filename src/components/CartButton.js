import React from "react";  
import { useSelector } from "react-redux";  
import { Link } from "react-router-dom";  

const CartButton = () => {  
    // Access the cart items from the Redux store  
    const cartItems = useSelector((state) => state.cart.items);  

    // Calculate the total number of items in the cart  
    const totalItems = cartItems.reduce((total, product) => total + (product.qty || 0), 0);  

    return (  
        <Link to="/cart" className="cart-button">  
            <div className="cart-icon-container">  
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>  
                {totalItems > 0 && (  
                    <span className="cart-badge">{totalItems}</span>  
                )}  
            </div>  
        </Link>  
    );  
};  

export default CartButton;