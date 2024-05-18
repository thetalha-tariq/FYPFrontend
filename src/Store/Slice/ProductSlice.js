import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../axiosInstance";

export const getProducts = createAsyncThunk("getProducts",
    async () => {
        console.log("PRoduct api call>>>>>>>>>>>>>>>>>>>>>>")
        const config = {
            headers: {
                'x-access-token': localStorage.getItem("token"),
            }
        }
        try {
            console.log("try block getproducts")
            const response = await axios.get("/api/product", config);
            console.log("---------------------->>>>>>>>>>>>", response.data)


            return response.data
        }
        catch (error) {

            return (error)
        }
    })

// export const registerUser = createAsyncThunk("registerUser",
//     async (payload, { rejectWithValue }) => {
//         try {
//             const response = await axios.post("/api/user/register", payload);
//             const result = response.data
//             console.log("---------------------->>>>>>>>>>>>", result.data.user.userRole)
//             console.log(result.data.token)

//             return result.data.user
//         }
//         catch (error) {

//             return rejectWithValue(error)
//         }
//     })


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

        //create user

        // builder.addCase(registerUser.pending, (state) => {
        //     state.loading = true;
        // });
        // builder.addCase(registerUser.fulfilled, (state) => {
        //     state.loading = false
        // });
        // builder.addCase(registerUser.rejected, (state, action) => {
        //     state.error = action.payload.msg
        // });


        //fetch users

        // builder.addCase(fetchAllUsers.pending, (state) => {
        //     state.loading = true;
        // });
        // builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
        //     state.loading = false;
        //     state.users = action.payload
        //     // console.log(state.users)
        // });
        // builder.addCase(fetchAllUsers.rejected, (state, action) => {
        //     state.error = action.msg
        // });


        // // delete userById
        // builder.addCase(deleteUserById.fulfilled, (state, action) => {
        //     state.users = action.payload
        // })
    },



})
export const productReducer = productSlice.reducer;