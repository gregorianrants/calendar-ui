import React from 'react'
import Events from './Events'
import Hours from "./Hours";
import styled from 'styled-components'


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



export default function Day({gcalEvents,events,updateDisplayEvent,updateEvent,date}) {
    return (
        <DayStyled>
                    <Events
                        gcalEvents={gcalEvents}
                        events={events}
                            /*updateEvent={updateEvent}*/
                            updateDisplayEvent={updateDisplayEvent}
                    />
                    <Hours date={date}/>
        </DayStyled>
    )
}


