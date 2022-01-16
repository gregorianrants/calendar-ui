import { createSlice } from '@reduxjs/toolkit'
import {apiSlice} from "../api/apiSlice";

export const errorsSlice = createSlice({
    name: 'errors',
    initialState: {
        message: '',
        status: null,
        statusCode: null,
    },
    reducers: {

    },
    extraReducers: (builder)=>{
        builder.addMatcher(
            apiSlice.endpoints.getJobs.matchRejected,
            (state,{payload})=>{
                if(payload){
                    state.message = payload.data?.message
                    state.status=payload.data?.status
                    state.statusCode = payload.status
                }
            }
        )
    }
})



export default errorsSlice.reducer