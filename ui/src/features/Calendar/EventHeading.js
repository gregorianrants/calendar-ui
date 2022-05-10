import styled from "styled-components";
import {format} from "date-fns";
import React from "react";

const StyledSummaryText = styled.p`
  font-family: Roboto;
  font-size: 12px;
  margin-top: 0px;
  color: white;
  font-weight: 500;
  text-overflow: clip;
  //white-space: nowrap;
  overflow: hidden;
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



export default function EventHeading({start, end, summary}) {

    return (
        <>
            <TimeText>{format(start, 'p') + ' - ' + format(end, 'p')}</TimeText>
            <StyledSummaryText variant="subtitle2">{summary}</StyledSummaryText>
        </>
    )

}