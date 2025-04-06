import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchDishes = createAsyncThunk('dishes/fetchDishes', async (_, {rejectWithValue}) => {
    try{    
        const response = await axios.get('http://localhost:3001/dishes');
        if (!response.ok) {
            throw new Error("Server error")
        }
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message)
    }
  });

export const dishesSlice = createSlice({
    name: "dishes",
    initialState: {
        dihes: [],
        loading: false,
        error: null,
    },
    reducer: {
        

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDishes.pending, (state) => {state.loading = true; state.error = null})
            .addCase(fetchDishes.fulfilled, (state, action) => {state.loading = false; state.dihes = action.payload;})
            .addCase(fetchDishes.rejected, (state, action) => {state.loading = false; state.error = action.error.message});
    }
});

export default dishesSlice.reducer;

