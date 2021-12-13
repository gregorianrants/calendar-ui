// Import the RTK Query methods from the React-specific entry point
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import auth0Client from "../auth/auth0";
import {parseISO} from "date-fns";


const proposedDataStructure = {
    ids: [],
    eventsById: {},
    idsByDay: {
        monday: [],
        tuesday: []
    },
    memoizationStrings: {
        monday: [],
        tuesday: []
    }
}



export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api/v1',
        prepareHeaders: async (headers, {getState}) => {
            const token = getState().auth.token
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: builder => ({
        getJobs: builder.query({
            query: ({from, to}) => `/jobs?from=${from}&to=${to}`,
            transformResponse: response => {
               return response.data
            }
        }),
        getGcal: builder.query({
            query: ({from, to}) => `/gcal/events?from=${from}&to=${to}`,
            transformResponse: response => {
                console.log('35',response)
                return response.data.map(gcalEvent=>reshape(gcalEvent))
            }
        }),
    })
})

function reshape(gcalEvent){
    const {start,end,id} = gcalEvent
    return{
        ...gcalEvent,
        start: start.dateTime,
        end: end.dateTime,
        type: 'gcalEvent',
        _id: id
    }
}

// Export the auto-generated hook for the `getPosts` query endpoint
export const {useGetJobsQuery,useGetGcalQuery,usePrefetch} = apiSlice