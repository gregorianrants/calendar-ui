import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice'
import { apiSlice } from '../features/api/apiSlice'

import calendarReducer from "../features/Calendar/calendarSlice";


export default configureStore({
  reducer: {
    calendar: calendarReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(apiSlice.middleware)
});
