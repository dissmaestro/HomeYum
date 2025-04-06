import { createSlice } from "@reduxjs/toolkit";

const basketSlice = createSlice({
    name: "basket",
    initialState: {
        dihes: [],
    },
    reducers: {
        increment: (state, action) => { 
            let dishData = action.payload.id;
            if (state.dihes[dishData] === undefined) state.dihes[dishData] = 0;
            state.dihes[dishData]++;
        }, 
        decrement: (state, action) => {
            let dishData = action.payload.id;
            if (state.dihes[dishData] > 1) {
              state.dihes[dishData]--;
            } else {
              delete state.dihes[dishData];
            }
          },
        remove: (state, action) => {
            let dishData = action.payload.id;
            state.dihes[dishData] = 0;
            delete state.dihes[dishData];
        },
    }
});


export const selectBasket = (state) => state.basket.dishes;

export const {increment, decrement, remove} = basketSlice.actions;

export default basketSlice.reducer;