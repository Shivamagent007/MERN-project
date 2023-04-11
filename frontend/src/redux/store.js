import { configureStore } from '@reduxjs/toolkit';
import productsSlice from './productSlice.js';
import userSlice from './userSlice.js'

const store = configureStore({
  reducer: {
    products: productsSlice,
    users:userSlice,
  },
});

export default store;
