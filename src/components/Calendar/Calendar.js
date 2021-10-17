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

const CalendarStyled = styled.div`
  margin: 30px;
  display: grid;
  grid-template-rows: 60px 60px ${(props) =>
      String(props.hourHeight * 24) + "px"};
  grid-template-columns: 60px 1fr;
`;

export default function Calendar() {
  const [daysOnCal, dispatch] = useWeek();
  const [showNewJobModal, setShowNewJobModal] = React.useState(false);
  const [displayEvent, setDisplayEvent] = React.useState(null);
  const [events, setEvents] = React.useState([]);
  const [gcalEvents, setGcalEvents] = React.useState([]);
  //TODO have a think about what you are using/nameing current day. what does that mean

  //useGapi also returns a sign out function
  const { authed, listEvents } = useGapi();

  const { hourHeight } = React.useContext(settingsContext);

  const updateDisplayEvent = (id) => {
    setDisplayEvent(events.filter((event) => event._id === id)[0]);
  };

  React.useEffect(() => {
    fetchDays(daysOnCal.firstDay, daysOnCal.lastDay)
      .then((data) => {
        setEvents([...data]); //TODO have a look at what we are doing here what if there is no data
      })
      .catch(console.error);
  }, [daysOnCal]);

  React.useEffect(() => {
    if (authed) {
      listEvents(daysOnCal.firstDay, daysOnCal.lastDay) //TODO should technically be a dependancy need to wrap it in useCallback
        .then(setGcalEvents);

      console.log("aggghhhh");
    }
  }, [authed, daysOnCal]); //added in the listEvebts due to a warning in conslol

  /*  React.useEffect(()=>{
        const socket = socketIOClient('http://localhost:8000');
        console.log(socket)

        socket.on('message',(msg)=>{
            fetchWeekContaining(firstDayOfWeek)
                .then(data=> {
                    setEvents(data)
                })
                .catch(console.error)
        })
    },[firstDayOfWeek])*/

  const incrementWeek = () => {
    dispatch({ type: "INCREMENT" });
  };

  const decrementWeek = () => {
    dispatch({ type: "DECREMENT" });
  };

  const toggleNewJobModal = () => {
    setShowNewJobModal((val) => !val);
  };

  const closeDetailsModal = () => {
    setDisplayEvent(null);
  };

  const addToEvents = (event) => {
    if (fitsInWeek(daysOnCal.firstDay, event.start)) {
      setEvents((events) => [...events, event]);
    }
  };

  const updateEvent = (id, data) => {
    console.log(data);
    setEvents((events) => {
      console.log(events.length);
      const remainder = events.filter((event) => event._id !== id);
      console.log(remainder.length);
      return [...remainder, data];
    });
  };

  return (
    <React.Fragment>
      <CalendarStyled hourHeight={hourHeight}>
        <div></div>
        <Header
          currentDate={daysOnCal.currentDate}
          incrementWeek={incrementWeek}
          decrementWeek={decrementWeek}
          handleShowModal={toggleNewJobModal}
        />
        <div></div>
        <DayLabels days={daysOnCal.days} />
        <HourTicks />
        <Week
          events={events}
          gcalEvents={gcalEvents}
          days={daysOnCal.days}
          updateDisplayEvent={updateDisplayEvent}
          updateEvent={updateEvent}
        />
      </CalendarStyled>
      {showNewJobModal && (
        <NewJobModal
          addToEvents={addToEvents}
          toggleModal={toggleNewJobModal}
        />
      )}
      {displayEvent && (
        <JobModal
          displayEvent={displayEvent}
          close={closeDetailsModal}
          updateEvent={updateEvent}
        />
      )}
    </React.Fragment>
  );
}
