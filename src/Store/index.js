import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Slice/UserSlice";
import { productReducer } from "./Slice/ProductSlice";
import { doctorReducer } from "./Slice/DoctorSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
        doctor:doctorReducer
    }
})

export default store