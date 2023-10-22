import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    // userName: "",
    users: [],
    status: null,
  },
  reducers: {
    setUserDetails: (state, action) => {
      state.users = [...state.users, ...action.payload];
      state.userName = action.payload.username;
      // adding to local storage
      localStorage.setItem("userDetails", JSON.stringify(state.users));
      localStorage.setItem("userName", state.userName);
    },
    registerUser: (state, action) => {
      state.users.push(action.payload);
      // Save updated users to localStorage
      localStorage.setItem("userDetails", JSON.stringify(state.users));
    },
    // setName: (state, action) => {
    //   state.userName = action.payload;
    //   localStorage.setItem("userName", state.userName);
    // },
  },
});

export default loginSlice.reducer;
export const { registerUser, setUserDetails, setName } = loginSlice.actions;
