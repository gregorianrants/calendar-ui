import styled from "styled-components";

import DayLabels from "./DayLabels";
import HourTicks from "./HourTicks";

import Header from "./Header";
import settingsContext from "./Contexts";

import React from "react";

import { incrementWeekThunk, decrementWeekThunk } from "./calendarSlice";
import { useDispatch, useSelector } from "react-redux";

import {calendarSelectors} from "./calendarSlice";
import Events from "./Events";
import Hours from "./Hours";

const CalendarStyled = styled.div`
  margin: 30px;
  display: grid;
  grid-template-rows: 60px 60px ${(props) =>
      String(props.hourHeight * 24) + "px"};
  grid-template-columns: 60px 1fr;
`;

const WeekStyled = styled.div`
display: flex;
`

const DayStyled = styled.div`
  position: relative;
  flex: 1 0 100px;
  //TODO had a bit of problem here i getting borders line up
  //with those from Header ithink its todo with the way flex distributes 
  //extra space need to look into math of grow and shrink
  border-left: 1px solid var(--border-color-light);
  
  &:last-child{
    border-right: 1px solid var(--border-color-light);
  }
`

export default function Calendar() {
  const dispatch = useDispatch();

  const { hourHeight } = React.useContext(settingsContext);

  const incrementWeek = () => {
    dispatch(incrementWeekThunk);
  };

  const decrementWeek = () => {
    dispatch(decrementWeekThunk);
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
        />
        <div></div>
        <DayLabels days={days} />
        <HourTicks />
        <WeekStyled>
          {days.map((date,i) => (
              <DayStyled key={i}>
                <Events
                    date={date}
                />
                <Hours date={date}/>
              </DayStyled>
          ))}
        </WeekStyled>
      </CalendarStyled>

    </React.Fragment>
  );
}
