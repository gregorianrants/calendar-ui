import { createSlice } from "@reduxjs/toolkit";
import {getOrCreateUser} from "../../Model/user";
import {authorize} from "./gcalApi";



const initialState = {
    isAuthorized: false,
    events: [],
    loading: true
}

const gcalSlice = createSlice({
    name: "gCal",
    initialState,
    reducers: {
        authorize(state,action){
            state.isAuthorized = true
            state.loading = false
        }
    },
});

const { actions } = gcalSlice;

export const loadThunk = async (dispatch,getState)=>{
    const user = await getOrCreateUser()
    if (user.data.authorizedToGcal) dispatch(actions.authorize)
}

export const authorizeThunk = (code)=> async (dispatch,getState)=>{
    try {
        //TODO should i be creating user somewhere else
        //could do on server on fly - maybe not restfull though
        //could get or create user when user signs in to front end, that way when user signs in we allways know there is a user
        // perhaps leave here just now and do something more global later if we need user for something else.
        const user = await getOrCreateUser()
        console.log(user)
        const result = await authorize(code)
        console.log(result)
    }catch(err){
        console.error(err)
    }


}