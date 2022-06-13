import styled from "styled-components";
import {format} from "date-fns";
import React from "react";

import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import ClearIcon from '@material-ui/icons/Clear';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCoffee} from "@fortawesome/free-solid-svg-icons";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {faEnvelopeCircleCheck} from "@fortawesome/free-solid-svg-icons";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {faXmark} from "@fortawesome/free-solid-svg-icons";


const StyledSummaryText = styled.p`
  font-family: Roboto;
  font-size: 12px;
  margin-top: 0px;
  color: white;
  font-weight: 500;
  text-overflow: clip;
  //white-space: nowrap;
  overflow: hidden;
  margin-bottom: 0;
`

const TimeText = styled.p`
  font-family: Roboto;
  font-size: 12px;
  margin-top: 0px;
  color: white;
  font-weight: 500;
  margin-bottom: 0;
  text-overflow: clip;
  //white-space: nowrap;
  overflow: hidden;
`
const InviteStatusText = styled.p`
  font-family: Roboto;
  font-size: 16px;
  margin-top: 0px;
  color: white;
  font-weight: 500;
  margin-bottom: 0;
  text-overflow: clip;
  //white-space: nowrap;
  overflow: hidden;

`

export default function EventHeading({start, end, summary, attendees = []}) {
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