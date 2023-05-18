import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: true,
    error: null,
    user:null,
    isAuthenticated: null,
    userDetails: {},
}

const axiosI = axios.create({
    baseURL: 'http://localhost:3000',
  });

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder)=> {
        builder
            .addCase(login.pending, (state)=> {
                state.loading = true;
                state.isAuthenticated = false;                
            })
            .addCase(login.fulfilled, (state, action)=>{
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;                
            })
            .addCase(login.rejected, (state, action)=> {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;               
            })
            .addCase(register.pending, (state)=>{
                state.loading = true;
                state.isAuthenticated = false
            })
            .addCase(register.fulfilled,(state,action)=>{
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true
            })
            .addCase(register.rejected, (state,action)=>{
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
            })
            .addCase(logout.pending, (state)=> {
                state.loading = true;
            })
            .addCase(logout.fulfilled, (state)=>{
                state.loading = false;
                state.user = null
                state.isAuthenticated = false;
            })
            .addCase(logout.rejected, (state,action)=>{
                state.loading = false;
                state.error = action.payload
            })
            .addCase(loadUser.pending, (state)=> {
                state.loading = true;
                state.isAuthenticated = false;
                console.log(`user loading  in pending ${state.loading}`)

            })
            .addCase(loadUser.fulfilled, (state,action)=> {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                console.log("user loading fullfilled")
            })
            .addCase(loadUser.rejected, (state,action)=>{
                state.loading = false;
                state.error = action.payload;
                state.user = null;
                state.isAuthenticated = false;
                console.log("user loading rejected")

            })
            .addCase(updateUser.pending, (state)=> {
                state.loading = true
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(updateUser.rejected, (state, action)=> {
                state.loading = false
                state.error = action.payload
            })
            .addCase(updatePassword.pending, (state)=> {
                state.loading = true
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(updatePassword.rejected, (state, action)=> {
                state.loading = false
                state.error = action.payload
            })
            .addCase(forgotPassword.pending, (state)=> {
                state.loading = true
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(forgotPassword.rejected, (state, action)=> {
                state.loading = false
                state.error = action.payload
            })
            .addCase(resetPassword.pending, (state)=> {
                state.loading = true
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(resetPassword.rejected, (state, action)=> {
                state.loading = false
                state.error = action.payload
            })
    }
})

export const login = createAsyncThunk('user/login',async (userData) => {
    try {        

        const {data} = await axios.post('/api/v1/login',userData)
        return data
} catch (error) {
    throw error
}
})

export const register = createAsyncThunk('user/register',async (userData) => {
    try {
        console.log(userData)
        
        const {data} = await axios.post('/api/v1/register', userData)
        return data
    } catch (error) {
        throw error
    }
})

export const logout = createAsyncThunk('user/logout',async ()=> {
    try{
        await axios.get('api/v1/logout')
    }catch (error){
        throw error
    }
})

export const loadUser = createAsyncThunk('user/loadUser', async ()=> {
    try{
        const {data} = await axiosI.get('api/v1/me')
        return data
    } catch (error) {
        throw error
    }
})

export const updateUser = createAsyncThunk('user/updateUser', async (userData)=>{
    try{
        const { data } = await axios.put('/api/v1/me/update', userData)
        return data
    } catch (error) {
        throw error
    }

})

export const updatePassword = createAsyncThunk('user/updatePassword', async (userData)=>{
    try{
        const { data } = await axios.put('/api/v1/password/update', userData)
        return data
    } catch (error) {
        throw error
    }

})

export const forgotPassword = createAsyncThunk('user/forgotPassword', async (userData)=>{
    try{
        const { data } = await axios.post('/api/v1/password/forgot', userData)
        console.log(data)
        return data
    } catch (error) {
        throw error
    }

})

export const resetPassword = createAsyncThunk('user/resetPassword', async ({ token, userData })=>{
    try{
        console.log(token)
        console.log(userData)
        const { data } = await axios.put(`/api/v1/password/reset/${token}`, userData)
        console.log(data)
        console.log("success")
        return data
    } catch (error) {
        throw error
    }

})

export default userSlice.reducer