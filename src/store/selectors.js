export const selectUser = (state) => state.user.item;
export const selectUserStatus = (state) => state.user.status;

export const selectProducts = (state) => state.products.items;
export const selectProductsLoading = (state) => state.products.loading;
export const selectProductsStatus = (state) => state.products.status;

export const selectCart = (state) => state.cart.items;
export const selectCartCount = (state) => state.cart.cartCount;
export const selectTotalPrice = (state) => state.cart.totalPrice;
