import React from "react";


import styled from 'styled-components'

import {useHistory} from "react-router-dom";
import {StyledEvent} from "./styles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faEnvelope, faXmark} from "@fortawesome/free-solid-svg-icons";
import {format} from "date-fns";
import {StyledSummaryText,TimeText,InviteStatusText} from "./styles";


// const StyledEvent = styled.div`
//   position: absolute;
//   background-color: blue;
//   border: 0.5px solid white;
//   cursor: ${(props) => (props.overEdge ? "row-resize" : "default")};
//   padding: 0.25rem;
// `;

function EventHeading({start, end, summary, attendees = []}) {
    console.log(attendees)

    //"needsAction"

    const inviteStatus = attendees.map(attendee => {
        if (attendee.responseStatus === 'accepted') {
            return <FontAwesomeIcon icon={faCheck}/>
        }
        if (attendee.responseStatus === 'needsAction') {
            return <FontAwesomeIcon icon={faEnvelope}/>
        }
        if (attendee.responseStatus === 'declined') {
            return <FontAwesomeIcon icon={faXmark}/>
        }

        return <span>{attendee.responseStatus}</span>

    })


    return (
        <>
            <TimeText>{format(start, 'p') + ' - ' + format(end, 'p')}</TimeText>
            <StyledSummaryText variant="subtitle2"><span>{summary}</span></StyledSummaryText>
            <InviteStatusText>{inviteStatus}</InviteStatusText>

        </>
    )

}

export default function GcalTile({
                                  top: topProp,
                                  bottom: bottomProp,
                                  left,
                                  right,
                                  _id,
                                  start,
                                  end,
                                  updateEvent,
                                  updateDisplayEvent,
                                      summary,
                                      attendees
                              }) {

    const [top, setTop] = React.useState(topProp)
    const [bottom, setBottom] = React.useState(bottomProp)
    //const {hourHeight} = React.useContext(settingsContext)

    const operatives = attendees.filter(attendee=>!(attendee.organizer===true))

    console.log(operatives)

    let history = useHistory()

    React.useEffect(()=>{
        setTop(topProp)
        setBottom(bottomProp)
    },[topProp,bottomProp])

    function handleCLick(){
        history.push(`/calendar/gcal-details/${_id}`)
    }

    return (
        <StyledEvent data-component={'event'}
                     data-id={_id}
                     className='event'
                    backgroundColor='blue'
                     style={{
                         top: top+'px', bottom: bottom+'px', left, right
                     }}
                     onClick={handleCLick}
        >
            <EventHeading start={start} end={end} summary={summary} attendees={operatives}/>
        </StyledEvent>
    )
}
