import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../axiosInstance";

export const authenticateDoctor = createAsyncThunk("authenticateDoctor",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/doctor/loginDoctor", payload);
            const result = response.data
            console.log("---------------------->>>>>>>>>>>>", result.data.doctor.role)
            console.log(result.data.token)
            
            localStorage.setItem("token", result.data.token)
            // localStorage.setItem("userId", result.data.user._id)
            localStorage.setItem("role", result.data.doctor.role)
            localStorage.setItem("isAuthenticated", true)
            localStorage.setItem("doctorId",result.data.doctor._id)

            return result.data.doctor
        }
        catch (error) {

            return rejectWithValue(error)
        }
    })
    const doctorSlice = createSlice({
    name: 'doctor',
    initialState: {
        doctor: null,
        loading: false,
        error: null,
        responseMessage: null,
        // users: [],

    },
    extraReducers(builder) {


        //authenticate user
        builder.addCase(authenticateDoctor.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(authenticateDoctor.fulfilled, (state, action) => {

            state.loading = false;
            // console.log("action.payload", action.payload)
            state.user = action.payload
            // console.log(state.user)
        });
        builder.addCase(authenticateDoctor.rejected, (state, action) => {
            state.loading = false;
            // console.log(action.payload)
            // state.error = action.payload.msg
        });

    },



})
export const doctorReducer = doctorSlice.reducer;