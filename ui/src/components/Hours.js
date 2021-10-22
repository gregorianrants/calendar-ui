import React from "react";
import styled from "styled-components";
import settingsContext from './Contexts'


const HoursStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

`

const HourStyled = styled.div` 
  flex: 1 0 0;
  border-top: 1px solid lightgray;
  
  &:last-child{
    border-bottom: ${props=>`${props.borderWidth}px solid var(--border-color-light)`}
  }
   
    
`


export default function Hours({className}) {
    const {borderWidth,hourHeight}=React.useContext(settingsContext)


    return (
        <HoursStyled>
            {[...Array(24).keys()]
                .map((index) =>
                        <HourStyled
                            key={index}
                            data-hour={String(index)}
                            hourHeight={hourHeight}
                            borderWidth={borderWidth}
                            className={className}
                            draggable='false'
                        />
                )}
        </HoursStyled>

    )
}