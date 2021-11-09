import { configureStore } from "@reduxjs/toolkit";

import calendarReducer from "../components/Calendar/calendarSlice";

export default configureStore({
  reducer: {
    calendar: calendarReducer,
  },
});
