import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "./shop/shopSlice";
import userReducer from "./user/userSlice.js";
import reservationReducer from "./reservation/reservationSlice.js";

const store = configureStore({
    reducer: {
        shop: shopReducer,
        user: userReducer,
        reservation: reservationReducer,
    }
});

export default store;