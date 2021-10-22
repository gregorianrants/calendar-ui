import React from "react";


import styled from 'styled-components'



const StyledEvent = styled.div`
  position: absolute;
  background-color: blue;
  border: 0.5px solid white;
`


export default function GcalEvent({
                                  top: topProp,
                                  bottom: bottomProp,
                                  left,
                                  right,
                                  _id,
                                  start,
                                  end,
                                  updateEvent,
                                  updateDisplayEvent
                              }) {

    const [top, setTop] = React.useState(topProp)
    const [bottom, setBottom] = React.useState(bottomProp)
    //const {hourHeight} = React.useContext(settingsContext)

    React.useEffect(()=>{
        setTop(topProp)
        setBottom(bottomProp)
    },[topProp,bottomProp])




    return (
        <StyledEvent data-component={'event'}
                     data-id={_id}
                     className='event'

                     style={{
                         top: top+'px', bottom: bottom+'px', left, right
                     }}
        >
        </StyledEvent>
    )
}
