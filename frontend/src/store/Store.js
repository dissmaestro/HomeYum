import { configureStore } from "@reduxjs/toolkit";
import dihesReducer from "./dishesSlice"


export default configureStore ({
    reducer: {
        dishes: dihesReducer,
    }
})