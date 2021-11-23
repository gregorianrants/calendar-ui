import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice'

import calendarReducer from "../features/Calendar/calendarSlice";


export default configureStore({
  reducer: {
    calendar: calendarReducer,
    auth: authReducer
  },
});
