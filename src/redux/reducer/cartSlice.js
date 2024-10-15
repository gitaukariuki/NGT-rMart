import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
    },
    reducers: {
        addToCart(state, action) {
            const item = state.items.filter((item) => item.id === action.payload.id);
            if (item) {
                item.qty++;
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
                product.qty++;
            }
        },
        decreaseQuantity(state, action) {
            const product = state.items.find((item) => item.id === action.payload);
            if (product) {
                product.qty--;
            }
        },
    },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
