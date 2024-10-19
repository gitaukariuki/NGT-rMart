// store.js  
import { configureStore } from "@reduxjs/toolkit";  
import cartReducer from "./reducer/cartSlice"; // Adjusted path  

const store = configureStore({  
    reducer: {  
        cart: cartReducer,  
        // Other reducers can be added here  
    },  
});  

export default store;