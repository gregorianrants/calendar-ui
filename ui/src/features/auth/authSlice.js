import { createSlice } from "@reduxjs/toolkit";
import {getUser} from "../../Model/user";
import {getOrCreateUser} from "../../Model/user";

import auth0Client from "./auth0";
import {authorize} from "../googleCalendar/gcalApi";
import { fetchData } from "../Calendar/calendarSlice";

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
  try{
    dispatch(actions.startLoading())
    const auth0 = await auth0Client;
    const isAuthenticated = await auth0.isAuthenticated();
    if (!isAuthenticated) return dispatch(actions.logOut())
    dispatch(actions.authenticationSuccess())
    const user = await getOrCreateUser()
    console.log(user)
    if(user.data.authorizedToGcal) dispatch(actions.authorizedToGcalSuccess())
    dispatch(actions.stopLoading())
    dispatch(fetchData)
  }catch(err){
    console.error(err)
  }
}

export const authorizeGcalThunk = (code)=> async (dispatch,getState)=>{
  try{
    //TODO throw error if user hasnt been created or already authorized.
    const user = await getUser()
    if(!user) throw new Error('you cant authorize a user if they dont exist')
    console.log(user)
    //todo getorcreate user is calling .json before returning result we should make getuser behave the same
    const result = await authorize(code)
    const authorizedUser = await result.json()
    if(authorizedUser.data.authorizedToGcal) dispatch(actions.authorizedToGcalSuccess())
  }catch(err){
    console.error(err)
  }
  //   const authorizedUser = await authorize(code)
  //   console.log(authorizedUser)
  //   if(authorizedUser.data.authorizedToGcal) dispatch(actions.authorizedToGcalSuccess())
  // }catch(err){
  //   console.error(err)
  // }
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
