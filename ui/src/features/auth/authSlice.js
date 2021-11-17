import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authed: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn(state, action) {
      state.authed = true;
    },
    logOut(state, action) {
      state.authed = false;
    },
  },
});




export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
