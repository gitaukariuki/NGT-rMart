import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [], // Initial state is an empty array representing the cart items
    },
    reducers: {
        addToCart(state, action) {
            const existingItem = state.items.find((item) => item.id === action.payload.id);
            if (existingItem) {
                existingItem.qty += 1;
            } else {
                state.items.push({ ...action.payload, qty: 1 });
            }
        },
        removeFromCart(state, action) {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
        increaseQuantity(state, action) {
            const product = state.items.find((item) => item.id === action.payload);
            if (product) {
                product.qty += 1;
            }
        },
        decreaseQuantity(state, action) {
            const product = state.items.find((item) => item.id === action.payload);
            if (product) {
                if (product.qty > 1) {
                    product.qty -= 1;
                } else {
                    state.items = state.items.filter((item) => item.id !== action.payload);
                }
            }
        },
        clearCart(state) {
            state.items = []; // Clear the cart
        }
    },
});

// Export actions for use in components
export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
