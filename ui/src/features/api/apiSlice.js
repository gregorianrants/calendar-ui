// Import the RTK Query methods from the React-specific entry point
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const BASE_URL = process.env.REACT_APP_BASE_URL

console.log(BASE_URL)

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/api/v1`,

        prepareHeaders: async (headers, {getState}) => {
            const token = getState().auth.token
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    tagTypes: ['Jobs','Invoice','User'],
    endpoints: builder => ({
        getJobs: builder.query({
            query: ({from, to}) => `/jobs?from=${from}&to=${to}`,
            transformResponse: response => {
                return response.data.items
            },
            providesTags: (result=[],error,arg)=> {
                const r = [
                    'Jobs',
                    ...result.map(({_id}) => ({type: 'Jobs', id: _id}))
                ]
                return r
            }
        }),
        listJobs: builder.query({
            query: ({skip, invoiceState}) =>(
                invoiceState==='all'
                    ?
                    `/jobs?skip=${skip}&limit=10`
                    :
                    `/jobs?skip=${skip}&limit=10&invoiceState=${invoiceState}`
            ),
            transformResponse: response => {
                return response.data
            },
            /*providesTags: (result=[],error,arg)=> {
                const r = [
                    'Jobs',
                    ...result.items.map(({_id}) => ({type: 'Jobs', id: _id}))
                ]

                return r
            }*/
            providesTags: (result,error,arg)=> {
                const items = result?.items || []


                const r = [
                    'Jobs',
                    ...items.map(({_id}) => ({type: 'Jobs', id: _id}))
                ]

                return r
            }
        }),
        fakeData: builder.mutation({
            query: () => ({
                url: `/jobs/fake-data`,
                method: 'POST',
                body: {}
            }),
            invalidatesTags: ['Jobs']
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
        deleteJob: builder.mutation({
            query: id => ({
                url: `/jobs/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => {
                const r = [{type: 'Jobs', id: arg._id}]
                return r
            }
        }),
        getGcal: builder.query({
            query: ({from, to}) => `/gcal/events?from=${from}&to=${to}`,
            transformResponse: response => {
                return response.data.map(gcalEvent => reshape(gcalEvent))
            },
            //providesTags: ['GCal']
        }),
        createInvoice: builder.mutation({
            query: invoice => ({
                url: `/invoices`,
                method: 'POST',
                body: invoice
            }),
            invalidatesTags: ['Jobs']
        }),
        sendInvoice: builder.mutation({
            query: id => ({
                url: `/invoices/${id}:send-email`,
                method: 'POST',
                body: {}
            }),
            invalidatesTags: ['Jobs']
        }),
        voidInvoice: builder.mutation({
            query: id => ({
                url: `/invoices/${id}`,
                method: 'PATCH',
                body: {status: 'void'}
            }),
            invalidatesTags: ['Jobs']
        }),
        getUser: builder.query({
            query: () => `/users`,
            transformResponse: response => {
                return response.data
            },
            providesTags: ['User']
        }),
        editUser: builder.mutation({
            query: user => ({
                url: `/users`,
                method: 'PATCH',
                body: user
            }),
            invalidatesTags: ['User']
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
    useListJobsQuery,
    useDeleteJobMutation,
    useFakeDataMutation,
    useGetJobQuery,
    useEditJobMutation,
    useAddJobMutation,
    useCreateInvoiceMutation,
    useSendInvoiceMutation,
    useVoidInvoiceMutation,
    useGetGcalQuery,
    usePrefetch,
    useGetUserQuery,
    useEditUserMutation
} = apiSlice