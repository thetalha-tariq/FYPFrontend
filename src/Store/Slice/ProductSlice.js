import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../axiosInstance";

export const getProducts = createAsyncThunk("getProducts",
    async () => {
        const config = {
            headers: {
                'x-access-token': localStorage.getItem("token"),
            }
        }
        try {
            const response = await axios.get("/api/product", config);
            return response.data
        }
        catch (error) {

            return (error)
        }
    })

const productSlice = createSlice({
    name: 'Product',
    initialState: {
        products: [],
        loading: false,
        error: null,
        responseMessage: null,

    },
    extraReducers(builder) {


        //authenticate user
        builder.addCase(getProducts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getProducts.fulfilled, (state, action) => {

            state.loading = false;
            // console.log("action.payload", action.payload)
            state.products = action.payload.products
            console.log("data in product", state.products)
        });
        builder.addCase(getProducts.rejected, (state, action) => {
            state.loading = false;
            // console.log(action.payload)
            // state.error = action.payload.msg
        });
    },



})
export const productReducer = productSlice.reducer;