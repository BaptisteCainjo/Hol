import { createSlice } from "@reduxjs/toolkit";
import { addProduct, deleteProduct, deleteShop, getUserShop, loadProducts, loadShops, updateProduct } from "./shopAction";

const shopSlice = createSlice({
    name: "shop",
    initialState: {
        shops: [],
        loading: false,
        watchingShopId: null,
        products: [],
        editingProduct: null, // Nouvel état pour indiquer si un produit est en cours d'édition
        editingProductId: null,
        userCurrentShop: null,
    },
    reducers: {
        startWatch(state, action) {
            state.watchingShopId = action.payload;
        },
        stopWatch(state, action) {
            state.watchingShopId = null;
        },
        startEdit: (state, action) => {
            state.editingProduct = true;
            state.editingProductId = action.payload; // Réinitialise l'état d'édition à true
        },
        stopEdit: (state) => {
            state.editingProduct = false;
            state.editingProductId = null; // Réinitialise l'état d'édition à false
            // state.errorAPI = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadShops.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(loadShops.fulfilled, (state, action) => {
                state.shops = action.payload;
                state.loading = false;
            })
            .addCase(loadShops.rejected, (state, action) => {
                console.error(action.error.message);
                state.loading = false;
            })
            .addCase(deleteShop.fulfilled, (state, action) => {
                state.shops = state.shops.filter(shop => shop.id !== action.payload);
            })
            .addCase(deleteShop.rejected, (action, state) => {
                console.error(action.error.message);
            })
            .addCase(loadProducts.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(loadProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.loading = false;
            })
            .addCase(loadProducts.rejected, (state, action) => {
                console.error(action.error.message);
                state.loading = false;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })
            .addCase(addProduct.rejected, (state, action) => {
                console.error(action.error.message);
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const productIndex = state.products.findIndex(product => product._id === action.payload._id);
                state.products[productIndex] = action.payload;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                console.error(action.error.message);
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(product => product._id !== action.payload);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                console.error(action.error.message);
            })
            .addCase(getUserShop.fulfilled, (state, action) => {
                state.userCurrentShop = action.payload;
                console.log("elise")
            })
            .addCase(getUserShop.rejected, (state, action) => {
                console.error(action.error.message);
            })
    }
});

export const { startWatch, stopWatch, startEdit, stopEdit } = shopSlice.actions;
export default shopSlice.reducer;