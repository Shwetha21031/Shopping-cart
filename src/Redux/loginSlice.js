import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { act } from "@testing-library/react";
import axios from "axios";




const loginSlice = createSlice({
    name: "login",
    initialState:{
        userName:'',
        users: [],
        status: null,
    },
   reducers: {
    setUserDetails: (state,action) => {
        state.users = [...state.users , ...action.payload]
        state.userName = action.payload.username;
    },
    registerUser: (state,action)=>{
        state.users.push(action.payload)
    },
    setName: (state,action)=>{
        state.userName = action.payload
    }
   },
   
})

export default loginSlice.reducer
export const {registerUser,setUserDetails,setName} = loginSlice.actions