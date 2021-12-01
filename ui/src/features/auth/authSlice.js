import { createSlice } from "@reduxjs/toolkit";
import {getUser} from "../../Model/user";
import {createUser} from "../../Model/user";
import {getOrCreateUser} from "../../Model/user";

import auth0Client from "./auth0";

const initialState = {
  isAuthenticated: false,
  isAuthorizedToGcal: false,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLoading(state,action){
      state.loading = true
    },
    stopLoading(state,action){
      state.loading = false
    },
    authenticationSuccess(state, action) {
      state.isAuthenticated = true;
      state.loading = false
    },
    authorizedToGcalSuccess(state,action){
      state.isAuthorizedToGcal = true
    },
    logOut(state,action){
      state.isAuthorizedToGcal = false
      state.isAuthenticated = false
      state.loading = false
    }
  },
});

//TODO: need to think about error handling for all these thunks

export const loginThunk = async (dispatch, getState) => {
  const auth0 = await auth0Client;
  await auth0.loginWithRedirect({
    redirect_uri: "http://localhost:3000/auth",
  });
  //logged in. you can get the user profile like this:
}

const { actions } = authSlice;

export const onloadThunk = async (dispatch,getState) =>{
  dispatch(actions.startLoading())
  const auth0 = await auth0Client;
  const isAuthenticated = await auth0.isAuthenticated();
  if (isAuthenticated) {
    const user = await getOrCreateUser()
    if (user.data.authorizedToGcal) dispatch(actions.authorizedToGcalSuccess)
    dispatch(actions.authenticationSuccess())
  }
  else{
    dispatch(actions.stopLoading())
  }
}

export const handleRedirectThunk = (payload) => async (dispatch, getState) => {
  const auth0 = await auth0Client;

  await auth0.handleRedirectCallback();

  dispatch(onloadThunk)
};

export const logoutThunk = async (dispatch, getState) => {
  const auth0 = await auth0Client;
  await auth0.logout({
    returnTo: "http://localhost:3000/",
  });
};

export default authSlice.reducer;
