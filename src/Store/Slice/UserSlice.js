import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../axiosInstance";

export const authenticateUser = createAsyncThunk(
    "authenticateUser",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/user/login", payload);
            const result = response.data;
            localStorage.setItem("token", result.data.token);
            localStorage.setItem("role", result.data.user.userRole);
            localStorage.setItem("isAuthenticated", true);
            localStorage.setItem("userId", result.data.user._id);
            return result.data.user;
        } catch (error) {
            console.log(error.response.data.message)
            alert(error.response.data.message);
            localStorage.setItem("error", error.response.data.message)
            // return rejectWithValue(error.response.data);
        }
    }
);
export const registerUser = createAsyncThunk("registerUser",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/user/register", payload);
            const result = response.data
            console.log("---------------------->>>>>>>>>>>>", result)
            console.log(result.data.token)

            return result.data.user
        }
        catch (error) {
            console.log(error.response.data.message)
            localStorage.setItem("error", error.response.data.message)
            alert(error.response.data.message);
            // response.data.message
            // return rejectWithValue(error)
        }
    })


const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        loading: false,
        error: null,
        responseMessage: null,
        // users: [],

    },
    extraReducers(builder) {


        //authenticate user
        builder.addCase(authenticateUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(authenticateUser.fulfilled, (state, action) => {

            state.loading = false;
            // console.log("action.payload", action.payload)
            state.user = action.payload
            // console.log(state.user)
        });
        builder.addCase(authenticateUser.rejected, (state, action) => {
            state.loading = false;
            // console.log(action.payload)
            // state.error = action.payload.msg
        });

        //create user

        builder.addCase(registerUser.pending, (state) => {
            // state.loading = true;
        });
        builder.addCase(registerUser.fulfilled, (state) => {
            // state.loading = false
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            // state.error = action.payload.msg
        });


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
export const userReducer = userSlice.reducer;