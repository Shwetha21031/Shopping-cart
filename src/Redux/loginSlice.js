import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: "login",
    initialState:{
        userName:"abc",
        password:'123',
    },
   reducers: {
   }
})

export default loginSlice.reducer