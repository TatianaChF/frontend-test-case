import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {userApi} from "../../api/userApi";

export const fetchUser = createAsyncThunk(
    "user/fetchUser",
    async () => {
        return await userApi.getCurrentUser();
    }
);

const initialState = {
    item: null,
    status: 'idle',
}

const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.item = action.payload;
            })
    }
});

export default userSlice.reducer;