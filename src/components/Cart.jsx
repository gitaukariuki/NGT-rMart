import React from "react";  
import { useSelector, useDispatch } from "react-redux";  
import { increaseQuantity, decreaseQuantity, removeFromCart } from "../redux/reducer/cartSlice"; // Adjust the import based on your file structure  

const Cart = () => {  
    const dispatch = useDispatch();  
    const cartItems = useSelector((state) => state.cart.items);  

    // Function to handle quantity change  
    const handleButton = (product, action) => {  
        if (action === "increase") {  
            dispatch(increaseQuantity(product.id));  
        } else if (action === "decrease") {  
            if (product.qty > 1) {  
                dispatch(decreaseQuantity(product.id));  
            } else {  
                dispatch(removeFromCart(product.id)); // Remove item if quantity is 1 and decrease is pressed  
            }  
        }  
    };  

    // Calculate total price  
    const totalPrice = cartItems.reduce((total, product) => total + product.qty * product.price, 0);  

    return (  
        <div className="cart-container">  
            {cartItems.length === 0 ? (  
                <h2>Your cart is empty</h2>  
            ) : (  
                <>  
                    {cartItems.map((product) => (  
                        <div className="row" key={product.id}>  
                            <div className="col-md-4">  
                                <img src={product.image} alt={product.title} height="200px" width="180px" />  
                            </div>  
                            <div className="col-md-4">  
                                <h3>{product.title}</h3>  
                                <p className="lead fw-bold">  
                                    {product.qty} X Ksh {product.price} = Ksh {product.qty * product.price}  
                                </p>  
                                <button   
                                    type="button"   
                                    className="btn btn-outline-dark"   
                                    onClick={() => handleButton(product, "decrease")}  
                                    aria-label={`Decrease quantity of ${product.title}`}>  
                                    <i className="fa fa-minus"></i>  
                                </button>  
                                <button   
                                    type="button"   
                                    className="btn btn-outline-dark"   
                                    onClick={() => handleButton(product, "increase")}  
                                    aria-label={`Increase quantity of ${product.title}`}>  
                                    <i className="fa fa-plus"></i>  
                                </button>  
                            </div>  
                        </div>  
                    ))}  
                    <h3>Total: Ksh {totalPrice}</h3>  
                </>  
            )}  
        </div>  
    );  
};  

export default Cart;