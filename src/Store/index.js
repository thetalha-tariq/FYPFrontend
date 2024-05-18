import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Slice/UserSlice";
import { productReducer } from "./Slice/ProductSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer
    }
})

export default store