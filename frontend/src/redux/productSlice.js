import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';



const initialState = {
  loading: false,
  error: null,
  products: [],
  productsCount: 0,
  productDetails: {},
  filteredProductsCount:0,
  
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllProducts.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.products = action.payload.products;
        state.productsCount = action.payload.productsCount;
        state.filteredProductsCount = action.payload.filteredProductsCount
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductDetails.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.productDetails = {};
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.productDetails = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.productDetails = {};
      });
  }
});

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async ({ keyword = "", currentPage = 1, minPrice = 0, maxPrice = 25000, category, rating=0}) => {
    let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${minPrice}&price[lte]=${maxPrice}&ratings[gte]=${rating}`;
    if (category){
      link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${minPrice}&price[lte]=${maxPrice}&category=${category}&ratings[gte]=${rating}`;
    }
    console.log(link)
    const { data } = await axios.get(link);
    return data;
  }
);

export const fetchProductDetails = createAsyncThunk(
  'products/fetchProductDetails',
  async (productId) => {
    const { data } = await axios.get(`/api/v1/product/${productId}`);
    return data;
  }
);

export default productsSlice.reducer;
