import styled from "styled-components";

export const StyledEvent = styled.div`
  position: absolute;
  background-color: ${(props) => props.backgroundColor};
  border: 0.5px solid white;
  cursor: ${(props) => (props.overEdge ? "row-resize" : "default")};
  padding: 0.25rem;
`;

export const StyledSummaryText = styled.p`
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

export const TimeText = styled.p`
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
export const InviteStatusText = styled.p`
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