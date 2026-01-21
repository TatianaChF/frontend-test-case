import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    items: [],
    cartCount: 0,
    totalPrice: 0,
    cartItemsCount: 0,
    cartTotalAmount: 0,
    cartTotalSum: 0
}

const updateCalculatedFields = (state) => {
    state.cartCount = state.items.reduce((total, item) => total + item.quantity, 0)
    state.cartItemsCount = state.items.length
    state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    state.cartTotalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    state.cartTotalSum = state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload
            const existingItem = state.items.find(item => item.id === product.id)

            if (existingItem) {
                existingItem.quantity += 1
            } else {
                state.items.push({ ...product, quantity: 1 })
            }

            updateCalculatedFields(state);
        },

        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload)

            updateCalculatedFields(state);
        },

        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload
            const item = state.items.find(item => item.id === id)

            if (item) {
                item.quantity = quantity
            }

            updateCalculatedFields(state);
        },

        clearCart: (state) => {
            state.items = []
            state.cartCount = 0
            state.cartItemsCount = 0
            state.totalPrice = 0
            state.cartTotalAmount = 0
            state.cartTotalSum = 0
        }
    }
})

export const {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
} = cartSlice.actions

export default cartSlice.reducer;