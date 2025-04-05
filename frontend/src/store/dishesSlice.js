import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const fetchDishes = createAsyncThunk('dishes/fetch', async () => {
    const response = await axios.get('http://localhost:3001/dishes');
    return response.data;
  });

export const dishesSlice = createSlice({
    name: "dishes",
    initialState: {
        dihes: [],
        loading: false,
        error: nill,
    },
    reducer: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDishes.pending, (state) => {state.loading = true;})
            .addCase(fetchDishes.fulfilled, (state, action) => {state.loading = false; state.dihes = action.payload;})
            .addCase(fetchDishes.rejected, (state, action) => {state.loading = false; action.error.message})
    }
});

export default dishesSlice.reducer;

