import React from "react";
import styled from "styled-components";
import settingsContext from "./Contexts";
import { useHistory } from "react-router";
import { formatISO } from "date-fns";
import {useLocation} from "react-router-dom";

const HoursStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const HourStyled = styled.div`
  flex: 1 0 0;
  border-top: 1px dotted lightgray;
  scroll-snap-align: center;  //this also requires snap-type property on Scroll Portal component

  &:last-child {
    border-bottom: ${(props) =>
      `${props.borderWidth}px solid var(--border-color-light)`};
  }
  
  
  
`;

export default function Hours({ className, date }) {
  const { borderWidth, hourHeight } = React.useContext(settingsContext);
  const history = useHistory();
  const location = useLocation()

  const handleClick = (hour) => {
    history.push(
      `/calendar/create-job-form?hour=${String(hour)}&iso-date=${formatISO(
        date,
        { representation: "date" }
      )}`
    );
  };

  return (
    <HoursStyled>
      {[...Array(24).keys()].map((index) => (
        <HourStyled
          key={index}
          data-hour={String(index)}
          hourHeight={hourHeight}
          borderWidth={borderWidth}
          className={className}
          draggable="false"
          onClick={() => handleClick(index)}
        >

        </HourStyled>
      ))}
    </HoursStyled>
  );
}
