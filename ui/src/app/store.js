import { configureStore } from "@reduxjs/toolkit";

import calendarReducer from "../components/Calendar/calendarSlice";
import authReducer from "../features/auth/authSlice"

export default configureStore({
  reducer: {
    calendar: calendarReducer,
    auth: authReducer
  },
});
