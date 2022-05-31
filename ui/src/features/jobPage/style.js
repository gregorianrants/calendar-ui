import styled from "styled-components";
import {Paper} from "@material-ui/core";

export const Container = styled(Paper)`
  font-family: Roboto;
  color: #1A2027;
  width: fit-content;
  padding: 16px 12px;
`
export const Title = styled.h2`
  font-size: 18px;
  margin-top: 0;
`

export const SectionHeading = styled.h2`
  font-family: Roboto;
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 0.2em;
  color: #757de8;
`

export const Property = styled.td`
  width: 150px;
  font-weight: 400;
  font-family: Roboto;
  font-size: 12px;
  color: slategray;
`

export const Value = styled.td`
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
`

export const ActionsStyled = styled.div`
  margin-top: 16px;
`

export const Items = styled.div`
  white-space: pre-line;
`