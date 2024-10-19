import React from 'react';  
import { useSelector, useDispatch } from 'react-redux';  
import { increaseQuantity, decreaseQuantity, removeFromCart } from '../redux/reducer/cartSlice';  

const Cart = () => {  
    const dispatch = useDispatch();  
    const cartItems = useSelector((state) => {  
        console.log("Full State:", state);  // Log the Redux state  
        console.log("Cart State:", state.cart);  // Log the Redux state  
        console.log("Cart Items", state.cart.items);
        return state.cart.items || [];   // Use empty array if items is undefined  
    });  

    const handleButton = (productId, action) => {  
        if (action === "increase") {  
            dispatch(increaseQuantity(productId));  
        } else if (action === "decrease") {  
            dispatch(decreaseQuantity(productId));  
        }  
    };  

    const totalPrice = cartItems.reduce((total, product) => total + product.qty * product.price, 0);  

    return (  
        <div className="cart-container">  
            {cartItems.length === 0 ? (  
                <h2>Your cart feels lonely</h2>  
            ) : (  
                <>  
                    <hr />  
                    <h2>Your Cart</h2>  
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
                                    onClick={() => handleButton(product.id, "decrease")}  
                                    aria-label={`Decrease quantity of ${product.title}`}  
                                >  
                                    <i className="fa fa-minus"></i>  
                                </button> &nbsp;  
                                <button  
                                    type="button"  
                                    className="btn btn-outline-dark"  
                                    onClick={() => handleButton(product.id, "increase")}  
                                    aria-label={`Increase quantity of ${product.title}`}  
                                >  
                                    <i className="fa fa-plus"></i>  
                                </button> &nbsp;  
                                <button  
                                    type="button"  
                                    className="btn btn-outline-danger"  
                                    onClick={() => dispatch(removeFromCart(product.id))}  
                                    aria-label={`Remove ${product.title} from cart`}  
                                >  
                                    Remove  
                                </button>  
                            </div>  
                        </div>  
                    ))}  
                    <hr />  
                    <h3>Total: Ksh {totalPrice}</h3>  
                </>  
            )}  
        </div>  
    );  
};  

export default Cart;