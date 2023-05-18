import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const axiosI = axios.create({
    baseURL: 'http://localhost:3000',
  });

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData) => {
    console.log(orderData)
    const { data } = await axiosI.post('api/v1/order/new', orderData);
    console.log(`Data on creation of order is ${data}`)
    return data;
  }
);

export const myOrders = createAsyncThunk(
  'orders/myOrders',
  async () => {
    const { data } = await axiosI.get('api/v1/admin/orders');
    console.log(`My orders data is ${data}`)
    return data;
  }
);

export const orderDetails = createAsyncThunk(
  'orders/orderDetails',
  async (id) => {
    const { data } = await axiosI.get(`api/v1/order/${id}`);
    console.log(`Single order details are ${data}`)
    return data;
  }
);

export const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    order: null,
    loading: true,
    error: null,
    orders: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = 'true';
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = 'false';
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = 'false';
        state.error = action.error.message;
      })
      .addCase(myOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(myOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(myOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(orderDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(orderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(orderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  }
});

export default orderSlice.reducer;
