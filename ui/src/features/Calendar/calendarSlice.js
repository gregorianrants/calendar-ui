import { createSlice } from "@reduxjs/toolkit";
import {
  weekContaining,
  setTimeDayStart,
  setTimeDayEnd,
} from "../../utilities/dateUtilities";
import { addDays,parseISO } from "date-fns";
import jobsModel from "../../Model/Jobs";
import gcalEventsModel from '../../Model/gcalEvents'
import { cloneDeep } from "lodash-es";

import compose from "compose-function";

export function getWeek(date, increment = 0) {
  const currentDate = addDays(new Date(date), increment * 7)
  const days = weekContaining(currentDate)
  const firstDay = setTimeDayStart(new Date(days[0])) //TODO
  const lastDay = setTimeDayEnd(new Date(days[days.length - 1])) //TODO
  return {
    currentDate: currentDate.toISOString(),
    days: days.map(day=>day.toISOString()),
    firstDay: firstDay.toISOString(),
    lastDay: lastDay.toISOString(),
  };
}

function serialiseEvent(event){
  return {...event,
    start: event.start.toISOString(),
    end: event.end.toISOString()
  }
}

function unSerialiseEvent(event){
  return {...event,
    start: parseISO(event.start),
    end: parseISO(event.end)
  }
}

const initialState = {
  ...getWeek(new Date()),
  events: [],
  gcalEvents: [],
  scrollPosition: 300
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    dataLoaded(state, action) {
      state.events = action.payload;
    },
    gcalDataLoaded(state,action){
      state.gcalEvents = action.payload
    },
    incrementWeek(state, action) {
      return {
        ...getWeek(state.currentDate, 1),
        events: [],
        gcalEvents: []
      };
    },
    decrementWeek(state) {
      return {
        ...getWeek(state.currentDate, -1),
        events: [],
        gcalEvents: []
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
    updateScrollPositions(state,action) {
      state.scrollPosition = action.payload
    }
  },
});

const { actions } = calendarSlice;

export const { updateScrollPositions} = actions

const fetchEvents = (dispatch, getState) => {
  const state = getState();
  jobsModel
      .fetchDays(
          state.calendar.firstDay.toString(),
          state.calendar.lastDay.toString()
      )
      .then((data) => {
        dispatch(actions.dataLoaded([...data])); //TODO have a look at what we are doing here what if there is no data
      })
      .catch(console.error);
};



const fetchGcalEvents = async (dispatch,getState)=>{
  const state = getState();
  gcalEventsModel
      .fetchDays(
          state.calendar.firstDay.toString(),
          state.calendar.lastDay.toString()
      )
      .then((data) => {
        dispatch(actions.gcalDataLoaded([...data])); //TODO have a look at what we are doing here what if there is no data
      })
      .catch(console.error);
}


export const fetchData = (dispatch, getState) => {
  dispatch(fetchEvents)
  const state = getState();
  if (!state.auth.isAuthorizedToGcal) return
  dispatch(fetchGcalEvents)
};



export const incrementWeekThunk = (dispatch, getState) => {
  dispatch(actions.incrementWeek());
  // dispatch(fetchData);
};

export const decrementWeekThunk = (dispatch, getState) => {
  dispatch(actions.decrementWeek());
  // dispatch(fetchData);
};

export const editJobThunk = (event) => (dispatch, getState) => {
  const data = serialiseEvent(event)
  const { _id } = data;
  console.log(data);
  jobsModel
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

export const createJobThunk = (event) => (dispatch, getState) => {
  const data = serialiseEvent(event)
  console.log("108", "helloooooo");
  jobsModel
    .createJob(data)
    .then((response) => {
      if (response.status === "success") {
        console.log("113", "success");
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

const filterByStartDate=(date)=>
  events=> events.filter(event => new Date(event.start).getDay() === date.getDay())

const unSerialiseEvents = (events)=> events.map(event=>unSerialiseEvent(event))


//TODO make this more readable
export const calendarSelectors = {
  currentDate: (state)=>parseISO(state.calendar.currentDate),
  days: (state)=>state.calendar.days.map(day=>parseISO(day)),
  //TODO should i be unserialising here or should i do it where is use the date
  events: state=>state.calendar.events.map(event=>unSerialiseEvent(event)),
  eventsForDate:
          date=> state=> compose(unSerialiseEvents,filterByStartDate(date))(state.calendar.events),
  gcalEvents: state=>state.calendar.gcalEvents.map(event=>unSerialiseEvent(event)),
  gcalEventsForDate:
      date=> state=> compose(unSerialiseEvents,filterByStartDate(date))(state.calendar.gcalEvents),
  eventById: id=>state=> {
    const result = state.calendar.events.find((event) => event._id == id)
    return unSerialiseEvent(result)
  },
  scrollPosition: state=>state.scrollPosition
}


export default calendarSlice.reducer;
