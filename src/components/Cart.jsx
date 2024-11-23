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
    const [showCheckout, setShowCheckout] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const cartItems = useSelector((state) => state.cart.items || []);
    const totalPrice = cartItems.reduce(
        (total, product) => total + product.qty * product.price,
        0
    );

    const handleQuantityChange = (productId, action) => {
        if (action === 'increase') {
            dispatch(increaseQuantity(productId));
        } else if (action === 'decrease') {
            dispatch(decreaseQuantity(productId));
        }
    };

    const handleCheckout = () => setShowCheckout(true);

    const confirmCheckout = async () => {
        setIsProcessing(true);
        try {
            const response = await axios.post(
                '/api/checkout',
                { cartItems, totalPrice }
            );
            console.log('Checkout Response:', response.data);

            alert('Checkout successful! Redirecting...');
            dispatch(clearCart());
            setIsProcessing(false);
            setShowCheckout(false);
            navigate('/checkout-success'); // Redirect to checkout success page
        } catch (error) {
            console.error('Checkout Error:', error);
            alert('An error occurred during checkout. Please try again.');
            setIsProcessing(false);
        }
    };

    return (
        <div className="cart-container">
            {cartItems.length === 0 ? (
                <h2>Your cart is empty</h2>
            ) : (
                <>
                    <h2>Your Cart</h2>
                    {cartItems.map((product) => (
                        <div className="cart-item" key={product.id}>
                            <div className="item-image">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    height="200px"
                                    width="180px"
                                />
                            </div>
                            <div className="item-details">
                                <h3>{product.title}</h3>
                                <p>
                                    {product.qty} x Ksh {product.price} = Ksh{' '}
                                    {product.qty * product.price}
                                </p>
                                <div className="item-actions">
                                    <button
                                        className="btn btn-outline-dark"
                                        onClick={() => handleQuantityChange(product.id, 'decrease')}
                                    >
                                        <i className="fa fa-minus"></i>
                                    </button>
                                    <button
                                        className="btn btn-outline-dark"
                                        onClick={() => handleQuantityChange(product.id, 'increase')}
                                    >
                                        <i className="fa fa-plus"></i>
                                    </button>
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() => dispatch(removeFromCart(product.id))}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <h3>Total: Ksh {totalPrice}</h3>
                    <div className="cart-actions">
                        <button
                            className="btn btn-success"
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
