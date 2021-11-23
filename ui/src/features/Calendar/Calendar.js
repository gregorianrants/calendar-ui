import styled from "styled-components";
import NewJobModal from "../../components/forms/NewJobModal";

import DayLabels from "../../components/DayLabels";
import Week from "../../components/Week";
import HourTicks from "../../components/HourTicks";

import Header from "../../components/Header";
import settingsContext from "../../components/Contexts";

import React from "react";

import JobModal from "../../components/forms/JobModal";

import { incrementWeekThunk, decrementWeekThunk } from "./calendarSlice";
import { useDispatch, useSelector } from "react-redux";

import {calendarSelectors} from "./calendarSlice";

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

  //const { authed, listEvents } = useGapi();

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

  const currentDate = useSelector(calendarSelectors.currentDate);
  const days = useSelector(calendarSelectors.days);

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
      {showNewJobModal && <NewJobModal toggleModal={toggleNewJobModal} />}
      {displayEvent && (
        <JobModal displayEvent={displayEvent} close={closeDetailsModal} />
      )}
    </React.Fragment>
  );
}
