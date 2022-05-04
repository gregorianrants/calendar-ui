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
  token: null
};

const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://dry-earth-66864.herokuapp.com'

console.log(BASE_URL)

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
      state.token = action.payload
    },
    authorizedToGcalSuccess(state,action){
      state.isAuthorizedToGcal = true
    },
    revokeGcal(state,action){
      state.isAuthorizedToGcal = false
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
    redirect_uri: `${BASE_URL}/auth`,
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
    const token = await auth0.getTokenSilently()
    dispatch(actions.authenticationSuccess(token))
    const user = await getOrCreateUser()
    if(user.data.authorizedToGcal) dispatch(actions.authorizedToGcalSuccess())
    dispatch(actions.stopLoading())
    // dispatch(fetchData)
  }catch(err){
    console.error(err)
  }
}

export const authorizeGcalThunk = (code)=> async (dispatch,getState)=>{
  try{
    //TODO throw error if user hasnt been created or already authorized.
    const user = await getUser()
    if(!user) throw new Error('you cant authorize a user if they dont exist')
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

export const revokeGcalThunk = ()=>async (dispatch,getState)=>{
  try{
    fetch('http://localhost:8000/api/v1/gcal/revoke-auth')
        .then(res=>res.json())
        .then(console.log)
        .then(()=>dispatch(actions.revokeGcal()))
  }
  catch(err){
   console.log(err)
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
    returnTo: `${BASE_URL}/`,
  });
};

export default authSlice.reducer;
