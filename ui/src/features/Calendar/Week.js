
import Day from "./Day";
import styled from "styled-components";




const WeekStyled = styled.div`
display: flex;
  
`

export default function Week({gcalEvents,events,days,updateDisplayEvent,updateEvent}){
    return(
        //TODO: consider efficiency of filterning all events each time for each day, should i be using a map object instead
        <WeekStyled>
            {days.map((date,i) => (
                <Day
                    gcalEvents={gcalEvents.filter(event => event.start.getDay() === date.getDay())}
                    events={events.filter(event => event.start.getDay() === date.getDay())}
                    key={i}
                    updateDisplayEvent={updateDisplayEvent}
                    date={date}
                />
            ))}
        </WeekStyled>
    )
}

