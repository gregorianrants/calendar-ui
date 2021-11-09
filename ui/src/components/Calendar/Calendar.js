import styled from "styled-components";
import NewJobModal from "../forms/NewJobModal";

import DayLabels from "../DayLabels";
import Week from "../Week";
import HourTicks from "../HourTicks";

import Header from "../Header";
import settingsContext from "../Contexts";

import { fetchDays } from "../../Model/Jobs";

import React from "react";
import { fitsInWeek } from "../../utilities/dateUtilities.js";

import JobModal from "../forms/JobModal";

//import socketIOClient from "socket.io-client";

import { useWeek } from "./reducer";
import { useGapi } from "../../useGapi/useGapi";

import { incrementWeekThunk, decrementWeekThunk } from "./calendarSlice";
import { useDispatch, useSelector } from "react-redux";

const CalendarStyled = styled.div`
  margin: 30px;
  display: grid;
  grid-template-rows: 60px 60px ${(props) =>
      String(props.hourHeight * 24) + "px"};
  grid-template-columns: 60px 1fr;
`;

export default function Calendar() {
  //const [daysOnCal, dispatch] = useWeek();
  const [showNewJobModal, setShowNewJobModal] = React.useState(false);
  const [displayEvent, setDisplayEvent] = React.useState(null);
  //const [events, setEvents] = React.useState([]);
  const events = useSelector((state) => state.calendar.events);
  //const [gcalEvents, setGcalEvents] = React.useState([]);

  const dispatch = useDispatch();

  const { authed, listEvents } = useGapi();

  const { hourHeight } = React.useContext(settingsContext);

  const updateDisplayEvent = (id) => {
    setDisplayEvent(events.filter((event) => event._id === id)[0]);
  };

  const incrementWeek = () => {
    //dispatch({ type: "INCREMENT" });
    dispatch(incrementWeekThunk);
  };

  const decrementWeek = () => {
    //dispatch({ type: "DECREMENT" });
    dispatch(decrementWeekThunk);
  };

  const toggleNewJobModal = () => {
    setShowNewJobModal((val) => !val);
  };

  const closeDetailsModal = () => {
    setDisplayEvent(null);
  };

  // const addToEvents = (event) => {
  //   if (fitsInWeek(daysOnCal.firstDay, event.start)) {
  //     setEvents((events) => [...events, event]);
  //   }
  // };

  // const updateEvent = (id, data) => {
  //   setEvents((events) => {
  //     const remainder = events.filter((event) => event._id !== id);
  //     const result = [...remainder, data];
  //     return result;
  //   });
  // };

  const addToEvents = () => {};

  const updateEvent = () => {};

  const currentDate = useSelector((state) => state.calendar.currentDate);
  const days = useSelector((state) => state.calendar.days);

  return (
    <React.Fragment>
      <CalendarStyled hourHeight={hourHeight}>
        <div></div>
        <Header
          currentDate={currentDate}
          incrementWeek={incrementWeek}
          decrementWeek={decrementWeek}
          handleShowModal={toggleNewJobModal}
        />
        <div></div>
        <DayLabels days={days} />
        <HourTicks />
        <Week
          events={events}
          gcalEvents={[]}
          days={days}
          updateDisplayEvent={updateDisplayEvent}
        />
      </CalendarStyled>
      {showNewJobModal && (
        <NewJobModal
          toggleModal={toggleNewJobModal}
        />
      )}
      {displayEvent && (
        <JobModal
          displayEvent={displayEvent}
          close={closeDetailsModal}
        />
      )}
    </React.Fragment>
  );
}
