import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {productsApi} from "../../api/productsApi";

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async () => {
        return await productsApi.getProducts()
    }
);

const initialState = {
    items: [],
    loading: false,
    status: 'idle',
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.status = 'failed';
            })
    }
});

export default productsSlice.reducer;