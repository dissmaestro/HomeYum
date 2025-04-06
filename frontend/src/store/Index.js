import { configureStore } from "@reduxjs/toolkit";
import dihesReducer from "./dishesSlice"
import basketReducer from "./basketSlice" 


export default configureStore ({
    reducer: {
        dishes: dihesReducer,
        basket: basketReducer,
    }
})