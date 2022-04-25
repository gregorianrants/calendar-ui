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
    tagTypes: ['Jobs'],
    endpoints: builder => ({
        getJobs: builder.query({
            query: ({from, to}) => `/jobs?from=${from}&to=${to}`,
            transformResponse: response => {
                return response.data.items
            },
            providesTags: (result=[],error,arg)=> {
                console.log(result)
                const r = [
                    'Jobs',
                    ...result.map(({_id}) => ({type: 'Jobs', id: _id}))
                ]
                console.log('47',r)
                return r
            }
        }),
        editJob: builder.mutation({
            query: job => ({
                url: `/jobs/${job._id}`,
                method: 'PUT',
                body: job
            }),
            invalidatesTags: (result, error, arg) => {
                const r = [{type: 'Jobs', id: arg._id}]
                return r
            }
        }),
        getJob: builder.query({
            query: id => ({
                url: `/jobs/${id}`
            }),
            transformResponse(response) {
                return response.data
            },
            providesTags: (result,error,arg)=>[{type: 'Jobs', id: arg}]
        }),
        addJob: builder.mutation({
            query: job => ({
                url: `/jobs`,
                method: 'POST',
                body: job
            }),
            invalidatesTags: ['Jobs']
        }),
        getGcal: builder.query({
            query: ({from, to}) => `/gcal/events?from=${from}&to=${to}`,
            transformResponse: response => {
                return response.data.map(gcalEvent => reshape(gcalEvent))
            },
            //providesTags: ['GCal']
        }),
    })
})

function reshape(gcalEvent) {
    const {start, end, id} = gcalEvent
    return {
        ...gcalEvent,
        start: start.dateTime,
        end: end.dateTime,
        type: 'gcalEvent',
        _id: id
    }
}

// Export the auto-generated hook for the `getPosts` query endpoint
export const {
    useGetJobsQuery,
    useGetJobQuery,
    useEditJobMutation,
    useAddJobMutation,
    useGetGcalQuery,
    usePrefetch
} = apiSlice