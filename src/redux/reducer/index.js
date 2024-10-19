import { combineReducers } from "redux";
import handleCart from "./handleCart"; // Import the handleCart reducer

const rootReducers = combineReducers({
  handleCart, // Add handleCart to the combined reducers
  // Include other reducers if you have more, like anotherReducer: anotherReducer
});

export default rootReducers;
