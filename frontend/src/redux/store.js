import { configureStore } from '@reduxjs/toolkit';
import productsSlice from './productSlice.js';
import userSlice from './userSlice.js'
import cartSlice from './cartSlice.js'
import orderSlice from './orderSlice.js'
import reviewSlice from './reviewSlice.js';

const store = configureStore({
  reducer: {
    products: productsSlice,
    users: userSlice,
    cart: cartSlice,
    orders: orderSlice,
    reviews: reviewSlice,
  },
});

export default store;
