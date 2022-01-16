import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice'
import { apiSlice } from '../features/api/apiSlice'
import errorsReducer from '../features/errors/errorsSlice'

import calendarReducer from "../features/Calendar/calendarSlice";


export default configureStore({
  reducer: {
    calendar: calendarReducer,
    auth: authReducer,
    errors: errorsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(apiSlice.middleware)
});
