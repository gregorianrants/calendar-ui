import { createSlice } from "@reduxjs/toolkit";
import {
  weekContaining,
  setTimeDayStart,
  setTimeDayEnd,
} from "../../utilities/dateUtilities";
import { addDays } from "date-fns";
import model from "../../Model/Jobs";
import { cloneDeep } from "lodash-es";

export function getWeek(date, increment = 0) {
  const currentDate = addDays(date, increment * 7);
  const days = weekContaining(currentDate);
  const firstDay = setTimeDayStart(new Date(days[0])); //TODO
  const lastDay = setTimeDayEnd(new Date(days[days.length - 1])); //TODO
  return {
    currentDate,
    days,
    firstDay,
    lastDay,
  };
}

const initialState = {
  ...getWeek(new Date()),
  events: [],
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    dataLoaded(state, action) {
      state.events = action.payload;
    },
    incrementWeek(state, action) {
      return {
        ...getWeek(state.currentDate, 1),
        events: [],
      };
    },
    decrementWeek(state) {
      return {
        ...getWeek(state.currentDate, -1),
        events: [],
      };
    },
    editJob(state, action) {
      const { payload } = action;
      const idToChange = state.events.findIndex(
        (event) => event._id == payload._id
      );
      if (idToChange !== -1) {
        state.events[idToChange] = cloneDeep(payload);
      }
    },
    createJob(state, action) {
      state.events.push(action.payload);
    },
  },
});

const { actions } = calendarSlice;

export const fetchData = (dispatch, getState) => {
  const state = getState();
  console.log(state.calendar.firstDay);
  model
    .fetchDays(
      state.calendar.firstDay.toString(),
      state.calendar.lastDay.toString()
    )
    .then((data) => {
      dispatch(actions.dataLoaded([...data])); //TODO have a look at what we are doing here what if there is no data
    })
    .catch(console.error);
};

export const incrementWeekThunk = (dispatch, getState) => {
  dispatch(actions.incrementWeek());
  dispatch(fetchData);
};

export const decrementWeekThunk = (dispatch, getState) => {
  dispatch(actions.decrementWeek());
  dispatch(fetchData);
};

export const editJobThunk = (data) => (dispatch, getState) => {
  const { _id } = data;
  console.log(data);
  model
    .editJob({ _id: _id, data: data })
    .then((response) => {
      if (response.status === "success") {
        dispatch(actions.editJob(data));
      } else if (
        response.status === "fail" &&
        response.name === "validationError"
      ) {
        console.log("i need validation");
      }
    })
    .catch(console.error);
};

export const createJobThunk = (data) => (dispatch, getState) => {
  model
    .createJob(data)
    .then((response) => {
      if (response.status === "success") {
        dispatch(actions.createJob(data));
      } else if (
        response.status === "fail" &&
        response.name === "validationError"
      ) {
        console.log("i need validation");
      }
    })
    .catch(console.error);
};

export default calendarSlice.reducer;
