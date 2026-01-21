import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userStore';
import productsReducer from "./slices/productsStore";
import cartReducer from "./slices/cartStore";

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
    cart: cartReducer,
  }
})

