import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../../axiosInstance";

const initialState = {
    orders: [],
    status: 'idle',
    error: null,
};

// Create Order
export const createOrder = createAsyncThunk(
    'orders/createOrder',
    async (orderData) => {
        console.log("orderData in slice is>>>", orderData)
        const response = await axios.post('/api/order/create', orderData);
        return response.data;
    }
);

// Fetch All Orders
export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async () => {
        const response = await axios.get('/api/order');
        return response.data;
    }
);

// Update Order Status
export const updateOrderStatus = createAsyncThunk(
    'orders/updateOrderStatus',
    async (id) => {
        const response = await axios.put(`/api/order/`);
        return response.data;
    }
);

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders.push(action.payload);
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchOrders.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateOrderStatus.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.orders.findIndex(order => order._id === action.payload._id);
                if (index !== -1) {
                    state.orders[index] = action.payload;
                }
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const orderReducer = ordersSlice.reducer;
