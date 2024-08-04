import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Slice/UserSlice";
import { productReducer } from "./Slice/ProductSlice";
import { doctorReducer } from "./Slice/DoctorSlice";
import { orderReducer } from './Slice/OrderSlice'

const store = configureStore({
    reducer: {
        orders: orderReducer,
        user: userReducer,
        product: productReducer,
        doctor: doctorReducer
    }
})

export default store