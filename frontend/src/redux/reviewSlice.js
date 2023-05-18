import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const axiosI = axios.create({
    baseURL: 'http://localhost:3000'
})

export const newReview = createAsyncThunk(
    'reviews/newReview', 
    async (reviewData)=> {
        console.log(reviewData)
        console.log(`why i am not working ${reviewData.comment}`)
        const { data } = await axiosI.put('api/v1/review', reviewData)
        return data;
    })

export const reviewSlice = createSlice({
    name: 'reviews',
    initialState: {
        loading: false,
        review: true,
        reviews: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(newReview.pending, (state) => {
            state.loading = 'true';
        })
        .addCase(newReview.fulfilled, (state, action)=> {
            state.loading = 'false';
            state.review = action.payload;
            
            console.log(`its working review is ${state.review}`)
        })
        .addCase(newReview.rejected, (state, action)=> {
            state.loading = 'false';
            state.review = action.error.message;
        })
    }

})

export default reviewSlice.reducer