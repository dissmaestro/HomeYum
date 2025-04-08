import { createSlice } from "@reduxjs/toolkit";

const basketSlice = createSlice({
    name: "basket",
    initialState: {
        dishes: [],
    },
    reducers: {
        increment: (state, action) => { 
            let dishData = action.payload.id;
            if (state.dishes[dishData] === undefined) state.dishes[dishData] = 0;
            state.dishes[dishData]++;
        }, 
        decrement: (state, action) => {
            let dishData = action.payload.id;
            if (state.dishes[dishData] > 1) {
              state.dishes[dishData]--;
            } else {
              delete state.dishes[dishData];
            }
          },
        remove: (state, action) => {
            let dishData = action.payload.id;
            state.dishes[dishData] = 0;
            delete state.dishes[dishData];
        },
    }
});


export const selectBasket = (state) => state.basket.dishes;

export const {increment, decrement, remove} = basketSlice.actions;

export default basketSlice.reducer;