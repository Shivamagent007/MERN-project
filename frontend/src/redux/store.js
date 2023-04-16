import { configureStore } from '@reduxjs/toolkit';
import productsSlice from './productSlice.js';
import userSlice from './userSlice.js'
import cartSlice from './cartSlice.js'

const store = configureStore({
  reducer: {
    products: productsSlice,
    users: userSlice,
    cart: cartSlice,
  },
});

export default store;
