// cartSlice.js  
import { createSlice } from "@reduxjs/toolkit";  

const cartSlice = createSlice({  
    name: "cart",  
    initialState: {  
        items: [],  // Initial state is an empty array representing the cart items  
    },  
    reducers: {  
        addToCart(state, action) {  
            const existingItem = state.items.find((item) => item.id === action.payload.id);  
            if (existingItem) {  
                // Increase the quantity if the product already exists in the cart  
                existingItem.qty += 1;  
            } else {  
                // Add the new product to the cart with a quantity of 1  
                state.items.push({ ...action.payload, qty: 1 });  
            }  
        },  
        removeFromCart(state, action) {  
            // Remove the item from the cart based on the product ID  
            state.items = state.items.filter((item) => item.id !== action.payload);  
        },  
        increaseQuantity(state, action) {  
            const product = state.items.find((item) => item.id === action.payload);  
            if (product) {  
                product.qty += 1;  // Increase quantity  
            }  
        },  
        decreaseQuantity(state, action) {  
            const product = state.items.find((item) => item.id === action.payload);  
            if (product) {  
                if (product.qty > 1) {  
                    product.qty -= 1;  // Decrease quantity  
                } else {  
                    // Remove the product if the quantity becomes 0  
                    state.items = state.items.filter((item) => item.id !== action.payload);  
                }  
            }  
        },  
    },  
});  

// Export actions for use in components  
export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;  
// Export the reducer to be used in the store  
export default cartSlice.reducer;