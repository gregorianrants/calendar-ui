import styled from "styled-components";

import DayLabels from "./DayLabels";
import HourTicks from "./HourTicks";

import Header from "./Header";
import settingsContext from "./Contexts";

import React, {useRef} from "react";

import {incrementWeekThunk, decrementWeekThunk, updateScrollPositions} from "./calendarSlice";
import {useDispatch, useSelector} from "react-redux";

import {calendarSelectors} from "./calendarSlice";
import Events from "./Events";
import Hours from "./Hours";
import {useGetJobsQuery} from "../api/apiSlice";

const CalendarStyled = styled.div`
  margin: 5px;
`;

const Corner = styled.div`
  flex: 0 0 60px;
`

const Row = styled.div`
  display: flex;
  background-color: transparent;

  &:nth-child(2) {
    flex: 1 0 0;
  }
`

const WeekStyled = styled.div`
  display: flex;
  height: ${props => `${props.hourHeight * 24}px`};
  flex: 1 0 0;
`


const DayStyled = styled.div`
  position: relative;
  //TODO had a bit of problem here i getting borders line up
  //with those from Header ithink its todo with the way flex distributes 
  //extra space need to look into math of grow and shrink
  border-left: 1px solid var(--border-color-light);
  flex: 1 0 0;

  &:last-child {
    border-right: 1px solid var(--border-color-light);
  }
`

const ScrollPortal = styled.div`
  width: 100%;
  overflow: scroll;
  margin: 0;
  padding: 0;
  //TODO this is a bit of a hack to make scroll portal fit on page on my dev monitor need to change so fits on page of any monitor
  height: 70vh;
  border-bottom: 1px solid lightgrey;
  //also requires scroll-snap-align property on Hours component
  //Todo consider making more elegant e.g. not having components depending on css in other components
  scroll-snap-type: y mandatory;  
  &::-webkit-scrollbar {
    display: none;
  }

`


export default function Calendar() {
    const dispatch = useDispatch();

    const {hourHeight} = React.useContext(settingsContext);
    const {scrollPosition} = React.useState(0)

   /* const scrollPosition = useSelector(state => state.calendar.scrollPosition)

    const rowEl = React.useRef(null)

    const initialScrollSet = React.useRef(null)

    React.useEffect(()=>{
      if(!initialScrollSet.current){
        rowEl.current.scrollTop =scrollPosition
        console.log(rowEl.current.scrollTop)
        initialScrollSet.current = true
      }
    },[rowEl])

    function handleScroll(e) {
        dispatch(updateScrollPositions(e.target.scrollTop))
    }*/

    function handleScroll(e){
        rowEl.current.scrollTop +=30
    }
    const rowEl = React.useRef(null)

    const initialScrollSet = React.useRef(null)

    React.useEffect(()=>{
        if(!initialScrollSet.current){
            rowEl.current.scrollTop =300
            initialScrollSet.current = true
        }
    },[rowEl])

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
                <Row>
                    <Corner className='corner'/>
                    <Header
                        currentDate={currentDate}
                        incrementWeek={incrementWeek}
                        decrementWeek={decrementWeek}
                    />
                </Row>
                <Row>
                    <Corner/>
                    <DayLabels days={days}/>
                </Row>
                <ScrollPortal ref={rowEl} >
                    <Row>
                        <HourTicks/>
                        <WeekStyled hourHeight={hourHeight}>
                            {days.map((date, i) => (
                                <DayStyled key={i}>
                                    <Events
                                        date={date}
                                    />
                                    <Hours date={date}/>
                                </DayStyled>
                            ))}
                        </WeekStyled>
                    </Row>
                </ScrollPortal>

            </CalendarStyled>
        </React.Fragment>
    );
}
