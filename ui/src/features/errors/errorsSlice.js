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
    clearErrors: (state,action)=>{
            return {
                message: '',
                status: null,
                statusCode: null,
            }
        }
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
        // builder.addMatcher(
        //     apiSlice.endpoints.getGcal.matchRejected,
        //     (state,{payload})=>{
        //         if(payload){
        //             state.message = payload.data?.message
        //             state.status=payload.data?.status
        //             state.statusCode = payload.status
        //         }
        //     }
        // )
    }
})

export const {clearErrors} = errorsSlice.actions



export default errorsSlice.reducer