import { combineReducers } from "redux";
import cartReducer from "./cartSlice"; // Ensure this path is correct

const rootReducer = combineReducers({
    cart: cartReducer, // Make sure the key here is 'cart' so it matches the selector in your component
});

export default rootReducer;
