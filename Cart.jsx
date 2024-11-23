import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
} from '../redux/reducer/cartSlice';
import './Cart.css';
import axios from 'axios';

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showCheckout, setShowCheckout] = useState(false); // State to handle checkout modal
    const [isProcessing, setIsProcessing] = useState(false); // State to handle loading during checkout

    const cartItems = useSelector((state) => state.cart.items || []);
    const totalPrice = cartItems.reduce(
        (total, product) => total + product.qty * product.price,
        0
    );

    const handleButton = (productId, action) => {
        if (action === 'increase') {
            dispatch(increaseQuantity(productId));
        } else if (action === 'decrease') {
            dispatch(decreaseQuantity(productId));
        }
    };

    const handleCheckout = () => {
        setShowCheckout(true);
    };

    const confirmCheckout = async () => {
        setIsProcessing(true);
        try {
            // Send cart details to the backend (mock API for this example)
            const response = await axios.post(
                '/api/checkout', // Replace with your backend endpoint
                {
                    cartItems,
                    totalPrice,
                }
            );

            console.log('Checkout Response:', response.data);
            alert('Checkout successful! Redirecting...');
            dispatch(clearCart()); // Clear the cart after successful checkout
            setIsProcessing(false);
            navigate('/thank-you'); // Redirect to a Thank You page
        } catch (error) {
            console.error('Checkout Error:', error);
            alert('An error occurred during checkout. Please try again.');
            setIsProcessing(false);
        } finally {
            setShowCheckout(false);
        }
    };

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
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    height="200px"
                                    width="180px"
                                />
                            </div>
                            <div className="col-md-4">
                                <h3>{product.title}</h3>
                                <p className="lead fw-bold">
                                    {product.qty} X Ksh {product.price} = Ksh{' '}
                                    {product.qty * product.price}
                                </p>
                                <button
                                    type="button"
                                    className="btn btn-outline-dark"
                                    onClick={() => handleButton(product.id, 'decrease')}
                                    aria-label={`Decrease quantity of ${product.title}`}
                                >
                                    <i className="fa fa-minus"></i>
                                </button>{' '}
                                &nbsp;
                                <button
                                    type="button"
                                    className="btn btn-outline-dark"
                                    onClick={() => handleButton(product.id, 'increase')}
                                    aria-label={`Increase quantity of ${product.title}`}
                                >
                                    <i className="fa fa-plus"></i>
                                </button>{' '}
                                &nbsp;
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

                    <div className="text-end mt-3">
                        <button
                            className="btn btn-success me-2"
                            onClick={handleCheckout}
                            disabled={isProcessing}
                        >
                            Checkout
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => dispatch(clearCart())}
                            disabled={isProcessing}
                        >
                            Clear Cart
                        </button>
                    </div>
                </>
            )}

            {showCheckout && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h5>Confirm Checkout</h5>
                        <p>Total Amount: Ksh {totalPrice}</p>
                        <button
                            className="btn btn-primary"
                            onClick={confirmCheckout}
                            disabled={isProcessing}
                        >
                            {isProcessing ? 'Processing...' : 'Confirm'}
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={() => setShowCheckout(false)}
                            disabled={isProcessing}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
